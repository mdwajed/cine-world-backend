"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.authController.register);
router.post("/login", auth_controller_1.authController.loggedInUser);
router.post("/refresh-token", auth_controller_1.authController.refreshToken);
router.post("/forgot-password", auth_controller_1.authController.forgotPassword);
router.post("/reset-password", auth_controller_1.authController.resetPassword);
exports.authRoutes = router;
