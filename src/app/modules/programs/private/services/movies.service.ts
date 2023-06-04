import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MovieCategories, MoviesResultType, MoviesFetchResult } from '../types/program-fetch-result.type';
import { VideoModel } from '../types/video-type';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) { }

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrls.moviesUrl;

  public async getMoviesByCategory(movieCategory: MovieCategories, page?: string): Promise<MoviesResultType[]> {
    return (await firstValueFrom(
      this.http.get<MoviesFetchResult>(`${this.apiUrl}/${movieCategory}?api_key=${this.apiKey}${page ? `&page=${page}` :  ''}`))
        .then(result=> {
          return {
            movies: result.results,
            pages: result.total_pages,
          }
    })).movies
  }

  public async getSimilarMovies(similarMovieId: string | number):Promise<MoviesResultType[]> {
    return (await firstValueFrom(this.http.get<MoviesFetchResult>(`${this.apiUrl}/${similarMovieId}/recommendations?api_key=17acd9c39b103a235bc6dcaa22e3957a`))).results
  }

  public async getMovieById(movieId: number): Promise<MoviesResultType> {
    return (await firstValueFrom(this.http.get<MoviesResultType>(`${this.apiUrl}/${movieId}?api_key=17acd9c39b103a235bc6dcaa22e3957a`)));
  }

  public async getMovieTrailer(id: number): Promise<string> {
    return await firstValueFrom(this.http.get<VideoModel>(`${this.apiUrl}/${id}/videos?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results.find(result => result.type === 'Trailer')),
      map(response=> `https://www.youtube.com/embed/${response?.key}`)
    ))
  }

  public async getMoviesSearchBar(value: string | null): Promise<MoviesResultType[]> {
    return await firstValueFrom(this.http.get<MoviesFetchResult>(`https://api.themoviedb.org/3/search/movie?api_key=17acd9c39b103a235bc6dcaa22e3957a&query=${value}`).pipe(
      map(movies => movies.results)
    ))
  }

  public async getMoviesCast(id: number): Promise<{}> {
    return await firstValueFrom(this.http.get(`${this.apiUrl}/${id}/credits?api_key=17acd9c39b103a235bc6dcaa22e3957a`))
  }
}
