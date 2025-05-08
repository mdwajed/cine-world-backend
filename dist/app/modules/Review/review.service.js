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
exports.reviewService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../utils/prisma");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.prisma.review.findMany();
    return reviews;
});
const getReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return review;
});
const updateReview = (userId, reviewId, role, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.findUniqueOrThrow({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Review not found");
    }
    const isUser = review.userId === userId;
    const isAdmin = role === client_1.Role.ADMIN;
    if (!isAdmin && (!isUser || review.status !== "PENDING")) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You can only edit your own unpublished reviews");
    }
    return yield prisma_1.prisma.review.update({
        where: {
            id: reviewId,
        },
        data: payload,
    });
});
const deleteReview = (reviewId, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.findUniqueOrThrow({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Review not found");
    }
    const isUser = review.userId === userId;
    const isAdmin = role === client_1.Role.ADMIN;
    if (!isAdmin && (!isUser || review.status !== "PENDING")) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You can only delete your own unpublished reviews");
    }
    yield prisma_1.prisma.review.delete({ where: { id: reviewId } });
    return { message: "Review deleted successfully" };
});
const updateReviewStatus = (reviewId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.review.update({
        where: { id: reviewId },
        data: { status },
    });
});
exports.reviewService = {
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
    updateReviewStatus,
};
