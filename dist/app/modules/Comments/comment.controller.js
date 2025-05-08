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
exports.commentController = void 0;
const catch_async_wrapper_express_1 = __importDefault(require("catch-async-wrapper-express"));
const comment_service_1 = require("./comment.service");
const responseData_1 = __importDefault(require("../../../utils/responseData"));
const http_status_codes_1 = require("http-status-codes");
const comment_validation_1 = require("./comment.validation");
const appError_1 = __importDefault(require("../../errors/appError"));
const addCommentToReview = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const validateData = comment_validation_1.commentSchema.parse(req.body);
    const result = yield comment_service_1.commentService.addCommentToReview(validateData, userId);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comment add to review successfull",
        data: result,
    });
}));
const removeComment = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const { id } = req.params;
    if (!userId || !userRole) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized access");
    }
    yield comment_service_1.commentService.removeComment(id, userId, userRole);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Remove comment successfully",
        data: null,
    });
}));
exports.commentController = {
    addCommentToReview,
    removeComment,
};
