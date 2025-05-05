import { TMovieFilterData } from "./movie.type";

export const movieSearchableFields: (keyof TMovieFilterData)[] = [
  "title",
  "director",
  "cast",
  "platform",
];

export const movieFilterableFields: string[] = ["searchTerm", "releaseYear"];
