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
exports.watchlistController = void 0;
const catch_async_wrapper_express_1 = __importDefault(require("catch-async-wrapper-express"));
const watchlist_service_1 = require("./watchlist.service");
const responseData_1 = __importDefault(require("../../../utils/responseData"));
const http_status_codes_1 = require("http-status-codes");
const getUserId_1 = __importDefault(require("../../../utils/getUserId"));
const addToWatchlist = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, getUserId_1.default)(req);
    const { movieId } = req.body;
    const result = yield watchlist_service_1.watchlistService.addToWatchlist(userId, movieId);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Added to watchlist",
        data: result,
    });
}));
const removeFromWatchlist = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, getUserId_1.default)(req);
    const { id } = req.params;
    const result = yield watchlist_service_1.watchlistService.removeFromWatchlist(userId, id);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Removed from watchlist",
        data: result,
    });
}));
const getUserWatchlist = (0, catch_async_wrapper_express_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, getUserId_1.default)(req);
    const result = yield watchlist_service_1.watchlistService.getUserWatchlist(userId);
    (0, responseData_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Watchlist fetched successfully",
        data: result,
    });
}));
exports.watchlistController = {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist,
};
