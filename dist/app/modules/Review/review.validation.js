"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewSchema = exports.reviewSchema = void 0;
const zod_1 = require("zod");
exports.reviewSchema = zod_1.z.object({
    rating: zod_1.z
        .number({
        required_error: "Rating is required",
        invalid_type_error: "Rating must be a number",
    })
        .min(1, "Rating must be at least 1")
        .max(10, "Rating cannot be more than 10"),
    content: zod_1.z
        .string({
        required_error: "Content is required",
    })
        .min(1, "Content cannot be empty"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tag must be a non-empty string"), {
        required_error: "Tags are required",
    }),
    hasSpoiler: zod_1.z.boolean({
        required_error: "hasSpoiler is required",
        invalid_type_error: "hasSpoiler must be a boolean",
    }),
});
exports.updateReviewSchema = exports.reviewSchema.partial();
