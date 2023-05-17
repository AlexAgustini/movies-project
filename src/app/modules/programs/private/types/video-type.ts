export interface individualVideo {
  iso_639_1: string,
  iso_3166_1: string,
  key: string,
  site: string
  name: string,
}

export interface VideoModel {
  id: string,
  results: Array<individualVideo>
}
