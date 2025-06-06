"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = Number((page - 1) * limit);
    const sortBy = options.sortBy || "name";
    const sortOrder = options.sortOrder || "asc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatePagination = calculatePagination;
