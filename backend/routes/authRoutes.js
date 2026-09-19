import { Router } from "express";
import { login, logout, register, forgotPassword, resetPassword } from "../controllers/authController.js";
import { uploadAvatar } from "../middleware/uploadMiddleware.js";

const router = Router();
router.post("/register", uploadAvatar.single("avatar"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
