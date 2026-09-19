import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes("******") || mongoUri.includes("replace_this")) {
    console.warn("MongoDB URI not configured. Continuing in development mock mode.");
    return;
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.warn("MongoDB connection failed. Continuing without database for local development.");
    console.warn(error.message);
  }
};

export default connectDB;
