import { Movie } from "./movie.model";

export interface MoviesResult {
  page: number,
  results: Movie[]
}
