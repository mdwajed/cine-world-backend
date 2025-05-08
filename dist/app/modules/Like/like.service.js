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
exports.likeService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../utils/prisma");
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const likeToReview = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.prisma.like.create({
            data: {
                userId,
                reviewId,
            },
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "You have already liked this review");
        }
        throw error;
    }
});
const unlikeToReview = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.like.delete({
        where: {
            userId_reviewId: {
                userId,
                reviewId,
            },
        },
    });
});
exports.likeService = {
    likeToReview,
    unlikeToReview,
};
