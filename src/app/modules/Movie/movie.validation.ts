import { Genre, MediaType, PurchaseType } from "@prisma/client";
import { z } from "zod";

export const movieRequestSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),

  synopsis: z
    .string({ required_error: "Synopsis is required" })
    .min(1, "Synopsis cannot be empty"),

  type: z.nativeEnum(MediaType, {
    required_error: "Media type is required",
  }),

  genres: z
    .array(z.nativeEnum(Genre), {
      required_error: "Genres are required",
    })
    .min(1, "At least one genre is required"),

  releaseYear: z
    .number({ required_error: "Release year is required" })
    .int("Release year must be an integer")
    .min(1800, "Enter a valid release year"),

  director: z
    .string({ required_error: "Director name is required" })
    .min(1, "Director name cannot be empty"),

  cast: z
    .string({ required_error: "Cast is required" })
    .min(1, "Cast cannot be empty"),

  platform: z
    .string({ required_error: "Platform is required" })
    .min(1, "Platform cannot be empty"),

  buyPrice: z
    .number({ required_error: "Buy price is required" })
    .min(0, "Buy price must be non-negative"),

  rentPrice: z
    .number({ required_error: "Rent price is required" })
    .min(0, "Rent price must be non-negative"),

  discount: z
    .number({ required_error: "Discount is required" })
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100"),

  streamingUrl: z
    .string({ required_error: "Streaming URL is required" })
    .url("Streaming URL must be valid"),
});
export const updateMovieRequestSchema = movieRequestSchema.partial();

export const reviewDataSchema = z.object({
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot be more than 10"),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Content cannot be empty"),
  tags: z.array(z.string().min(1, "Tag must be a non-empty string"), {
    required_error: "Tags are required",
  }),
  hasSpoiler: z.boolean({
    required_error: "hasSpoiler is required",
    invalid_type_error: "hasSpoiler must be a boolean",
  }),
});

export const createMovieRequestSchema = z.object({
  movieData: movieRequestSchema,
  reviewData: reviewDataSchema,
  purchaseType: z.nativeEnum(PurchaseType),
});
