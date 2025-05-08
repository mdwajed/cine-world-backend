"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), comment_controller_1.commentController.addCommentToReview);
router.delete("/:id", (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), comment_controller_1.commentController.removeComment);
exports.commentRoutes = router;
