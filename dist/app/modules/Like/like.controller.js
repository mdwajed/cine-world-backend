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
exports.likeController = exports.unlikeToReview = exports.likeToReview = void 0;
const catch_async_wrapper_express_1 = __importDefault(require("catch-async-wrapper-express"));
const http_status_codes_1 = require("http-status-codes");
const responseData_1 = __importDefault(require("../../../utils/responseData"));
const like_service_1 = require("./like.service");
const appError_1 = __importDefault(require("../../errors/appError"));
exports.likeToReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { reviewId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const result = yield like_service_1.likeService.likeToReview(userId, reviewId);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Review liked successfully",
        data: result,
    });
}));
exports.unlikeToReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const result = yield like_service_1.likeService.unlikeToReview(userId, id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Review unliked successfully",
        data: result,
    });
}));
exports.likeController = {
    likeToReview: exports.likeToReview,
    unlikeToReview: exports.unlikeToReview,
};
