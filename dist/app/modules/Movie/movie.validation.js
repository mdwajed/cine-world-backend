"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieRequestSchema = exports.reviewDataSchema = exports.updateMovieRequestSchema = exports.movieRequestSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.movieRequestSchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .min(1, "Title cannot be empty"),
    synopsis: zod_1.z
        .string({ required_error: "Synopsis is required" })
        .min(1, "Synopsis cannot be empty"),
    type: zod_1.z.nativeEnum(client_1.MediaType, {
        required_error: "Media type is required",
    }),
    genres: zod_1.z
        .array(zod_1.z.nativeEnum(client_1.Genre), {
        required_error: "Genres are required",
    })
        .min(1, "At least one genre is required"),
    releaseYear: zod_1.z
        .number({ required_error: "Release year is required" })
        .int("Release year must be an integer")
        .min(1800, "Enter a valid release year"),
    director: zod_1.z
        .string({ required_error: "Director name is required" })
        .min(1, "Director name cannot be empty"),
    cast: zod_1.z
        .string({ required_error: "Cast is required" })
        .min(1, "Cast cannot be empty"),
    platform: zod_1.z
        .string({ required_error: "Platform is required" })
        .min(1, "Platform cannot be empty"),
    buyPrice: zod_1.z
        .number({ required_error: "Buy price is required" })
        .min(0, "Buy price must be non-negative"),
    rentPrice: zod_1.z
        .number({ required_error: "Rent price is required" })
        .min(0, "Rent price must be non-negative"),
    discount: zod_1.z
        .number({ required_error: "Discount is required" })
        .min(0, "Discount must be at least 0")
        .max(100, "Discount cannot exceed 100"),
    streamingUrl: zod_1.z
        .string({ required_error: "Streaming URL is required" })
        .url("Streaming URL must be valid"),
});
exports.updateMovieRequestSchema = exports.movieRequestSchema.partial();
exports.reviewDataSchema = zod_1.z.object({
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
exports.createMovieRequestSchema = zod_1.z.object({
    movieData: exports.movieRequestSchema,
    reviewData: exports.reviewDataSchema,
    purchaseType: zod_1.z.nativeEnum(client_1.PurchaseType),
});
