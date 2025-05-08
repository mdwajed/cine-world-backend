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
exports.reviewController = void 0;
const catch_async_wrapper_express_1 = __importDefault(require("catch-async-wrapper-express"));
const review_service_1 = require("./review.service");
const responseData_1 = __importDefault(require("../../../utils/responseData"));
const http_status_codes_1 = require("http-status-codes");
const review_validation_1 = require("./review.validation");
const appError_1 = __importDefault(require("../../errors/appError"));
const getAllReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.reviewService.getAllReview();
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Reviews fetched successfully",
        data: result,
    });
}));
const getReviewById = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_service_1.reviewService.getReviewById(id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Review fetched successfully",
        data: result,
    });
}));
const updateReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const reviewId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const parsed = review_validation_1.updateReviewSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request data");
    }
    const result = yield review_service_1.reviewService.updateReview(userId, reviewId, role, parsed.data);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Update review successfully",
        data: result,
    });
}));
const deleteReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const reviewId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const result = yield review_service_1.reviewService.deleteReview(reviewId, userId, role);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: result.message,
        data: result,
    });
}));
const approveReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = yield review_service_1.reviewService.updateReviewStatus(id, "APPROVED");
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Review approved successfully",
        data: review,
    });
}));
const rejectReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = yield review_service_1.reviewService.updateReviewStatus(id, "REJECTED");
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Review rejected successfully",
        data: review,
    });
}));
exports.reviewController = {
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
    approveReview,
    rejectReview,
};
