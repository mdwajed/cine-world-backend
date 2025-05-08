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
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieService = void 0;
const pagination_1 = require("../../../utils/pagination");
const prisma_1 = require("../../../utils/prisma");
const movie_constant_1 = require("./movie.constant");
const createMovie = (userId, movieData, reviewData, purchaseType) => __awaiter(void 0, void 0, void 0, function* () {
    const accessUntil = purchaseType === "RENT"
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        : null;
    const result = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const movie = yield tx.movie.create({
            data: movieData,
        });
        const purchase = yield tx.purchase.create({
            data: {
                userId,
                movieId: movie.id,
                type: purchaseType,
                accessUntil,
            },
        });
        const review = yield tx.review.create({
            data: Object.assign({ movieId: movie.id, userId }, reviewData),
        });
        return { movie, purchase, review };
    }));
    return result;
});
const getAllMovie = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, pagination_1.calculatePagination)(options);
    const andConditions = [];
    const releaseYear = typeof params.releaseYear === "string"
        ? parseInt(params.releaseYear)
        : params.releaseYear;
    if (params.searchTerm) {
        andConditions.push({
            OR: movie_constant_1.movieSearchableFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (releaseYear) {
        andConditions.push({ releaseYear });
    }
    const whereCondition = { AND: andConditions };
    const movies = yield prisma_1.prisma.movie.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                releaseYear: "desc",
            },
        include: {
            reviews: true,
            purchases: true,
            watchlists: true,
        },
    });
    const total = yield prisma_1.prisma.movie.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: {
            movies,
        },
    };
});
const getMovieById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield prisma_1.prisma.movie.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return movie;
});
const updateMovie = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const movieData = yield prisma_1.prisma.movie.update({
        where: {
            id,
        },
        data: payload,
    });
    return movieData;
});
const deleteMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.movie.delete({
        where: {
            id,
        },
    });
});
exports.movieService = {
    createMovie,
    getAllMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
};
