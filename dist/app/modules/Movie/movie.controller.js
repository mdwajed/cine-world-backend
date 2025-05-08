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
exports.movieController = void 0;
const catch_async_wrapper_express_1 = __importDefault(require("catch-async-wrapper-express"));
const movie_service_1 = require("./movie.service");
const responseData_1 = __importDefault(require("../../../utils/responseData"));
const http_status_codes_1 = require("http-status-codes");
const pick_1 = __importDefault(require("../../../utils/pick"));
const movie_constant_1 = require("./movie.constant");
const appError_1 = __importDefault(require("../../errors/appError"));
const movie_validation_1 = require("./movie.validation");
const createMovie = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User ID is missing");
    }
    const parsed = movie_validation_1.createMovieRequestSchema.safeParse(req.body);
    if (!parsed.success) {
        console.error("Zod validation error:", parsed.error.format());
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request data");
    }
    const { movieData, reviewData, purchaseType } = parsed.data;
    console.log(movieData, reviewData, purchaseType, userId);
    const result = yield movie_service_1.movieService.createMovie(userId, movieData, reviewData, purchaseType);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Movie,Review,PurchaseType and Watchlist are created successfully",
        data: result,
    });
}));
const getAllMovie = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, movie_constant_1.movieFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield movie_service_1.movieService.getAllMovie(filters, options);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All movie fetched successfully",
        data: result,
    });
}));
const getMovieById = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_service_1.movieService.getMovieById(req.params.id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Movie fetched successfully",
        data: result,
    });
}));
const updateMovie = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const parsed = movie_validation_1.updateMovieRequestSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request data");
    }
    const result = yield movie_service_1.movieService.updateMovie(id, parsed.data);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Movie data updated successfully",
        data: result,
    });
}));
const deleteMovie = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield movie_service_1.movieService.deleteMovie(id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Movie and associate data deleted successfully",
        data: result,
    });
}));
exports.movieController = {
    createMovie,
    getAllMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
};
