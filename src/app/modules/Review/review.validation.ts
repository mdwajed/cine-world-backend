import { z } from "zod";

export const reviewSchema = z.object({
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
export const updateReviewSchema = reviewSchema.partial();
