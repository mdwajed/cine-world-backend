"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../app/errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const getUserId = (req) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    return userId;
};
exports.default = getUserId;
