import { z } from "zod";

export const commentSchema = z.object({
  reviewId: z.string().uuid({ message: "Invalid review ID" }),
  content: z.string().min(1, "Comment content cannot be empty"),
});
