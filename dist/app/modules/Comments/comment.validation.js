"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const zod_1 = require("zod");
exports.commentSchema = zod_1.z.object({
    reviewId: zod_1.z.string().uuid({ message: "Invalid review ID" }),
    content: zod_1.z.string().min(1, "Comment content cannot be empty"),
});
