"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../utils/prisma");
const appError_1 = __importDefault(require("../../errors/appError"));
const client_1 = require("@prisma/client");
const addCommentToReview = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ userId });
    const comment = yield prisma_1.prisma.comment.create({
        data: Object.assign(Object.assign({}, payload), { userId }),
    });
    return comment;
});
const removeComment = (commentId, userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const existingComment = yield prisma_1.prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
        },
    });
    if (!existingComment) {
        throw new Error("Comment not found ");
    }
    if (existingComment.userId !== userId && userRole !== client_1.Role.ADMIN) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized to delete this comment");
    }
    const deletedComment = yield prisma_1.prisma.comment.delete({
        where: {
            id: commentId,
        },
    });
    return deletedComment;
});
exports.commentService = {
    addCommentToReview,
    removeComment,
};
