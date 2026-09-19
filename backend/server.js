import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "node:url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const backendEnvPath = fileURLToPath(new URL("./.env", import.meta.url));
dotenv.config({ path: backendEnvPath });

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CRISTAL API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CRISTAL backend is healthy",
  });
});

// ===============================
// SERVER
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`CRISTAL server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

app.use(errorMiddleware);