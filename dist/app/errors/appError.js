"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class appError extends Error {
    constructor(statusCode, message, stack) {
        super(message);
        this.statusCode = statusCode;
        this.stack = stack;
        this.name = "appError";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = appError;
