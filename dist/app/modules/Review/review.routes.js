"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), review_controller_1.reviewController.getAllReview);
router.get("/:id", (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), review_controller_1.reviewController.getReviewById);
router.patch("/:id", (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), review_controller_1.reviewController.updateReview);
router.patch("/:id/approve", (0, auth_1.default)(client_1.Role.ADMIN), review_controller_1.reviewController.approveReview);
router.patch("/:id/reject", (0, auth_1.default)(client_1.Role.ADMIN), review_controller_1.reviewController.rejectReview);
router.delete("/:id", (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), review_controller_1.reviewController.deleteReview);
exports.reviewRoutes = router;
