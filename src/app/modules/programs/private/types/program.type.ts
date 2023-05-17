export interface Movie {
  adult: boolean,
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
  vote_count: number
}
