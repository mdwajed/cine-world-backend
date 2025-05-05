import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.loggedInUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
export const authRoutes = router;
