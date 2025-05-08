"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const globalError = (err, _req, res, _next) => {
    const statusCode = err.statusCode || err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        success: false,
        message: (err === null || err === void 0 ? void 0 : err.message) || "something went wrong",
        error: err,
    });
};
exports.default = globalError;
