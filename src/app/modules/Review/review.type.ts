import { ReviewStatus } from "@prisma/client";

export type TReviewData = {
  status?: ReviewStatus;
  rating: number;
  content: string;
  tags: string[];
  hasSpoiler: boolean;
};
export type TUpdateReviewData = {
  status?: ReviewStatus;
  rating?: number;
  content?: string;
  tags?: string[];
  hasSpoiler?: boolean;
};
