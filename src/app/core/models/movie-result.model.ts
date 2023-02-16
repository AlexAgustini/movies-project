import { Movie } from "./movie.model";

export interface MoviesResult {
  page: number,
  results: Movie[],
  total_results: number,
  total_pages: number
}
