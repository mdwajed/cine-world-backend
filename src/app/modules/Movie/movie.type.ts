import { Genre, MediaType, ReviewStatus } from "@prisma/client";
export type TMovieData = {
  title: string;
  synopsis: string;
  genres: Genre[];
  releaseYear: number;
  director: string;
  cast: string;
  platform: string;
  buyPrice: number;
  rentPrice: number;
  discount: number;
  streamingUrl: string;
  type: MediaType;
};
export type TMovieFilterData = {
  searchTerm?: string;
  title?: string;
  genres?: Genre;
  director?: string;
  cast?: string;
  platform?: string;
  releaseYear?: number;
};
export type TUpdateMovieData = {
  title?: string;
  synopsis?: string;
  genres?: Genre[];
  releaseYear?: number;
  director?: string;
  cast?: string;
  platform?: string;
  buyPrice?: number;
  rentPrice?: number;
  discount?: number;
  streamingUrl?: string;
  type?: MediaType;
};
export type TReviewData = {
  status?: ReviewStatus;
  rating: number;
  content: string;
  tags: string[];
  hasSpoiler: boolean;
};
