export interface ProgramResultType {
  adult: boolean,
  name: string,
  original_name: string,
  backdrop_path: string,
  belongs_to_collection: any,
  budget: number,
  genres: Array<{
    name: string,
    id: number
  }>,
  cast: Array<{
    profile_path: string
  }>
  homepage: string,
  id: number,
  imdb_id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: Array<{}>,
  production_countries: Array<{}>,
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: Array<{}>,
  status: string,
  tagline: string,
  title: string,
  video: boolean
  vote_average: number,
  vote_count: number,
  programFavorited?: boolean;
}

export interface ISeriesResult {
  adult: boolean;
  backdrop_path: string;
  created_by: [{id: string, name: string}],
  episode_run_time: Array<number>,
  first_air_date: string,
  genres: [{id: string, name: string}]
  homepage: string,
  seasons: [{}];
  tagline: string,
  vote_average: number,
  vote_count: number,
  popularity: number,
  overview: string,
  number_of_episodes: number
  original_name: string,
  name: string,
}

export interface ProgramsFetchResult {
  page: number,
  results: ProgramResultType[],
  total_results: number,
  total_pages: number
}

export type MovieCategories = "popular" | "upcoming" | "top_rated" | "now_playing";
export type SeriesCategories = "airing_today" | "on_the_air" | "popular" | "top_rated";
export type ProgramType = "tv" | "movies"
