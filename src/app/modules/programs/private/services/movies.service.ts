import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MovieCategories, ProgramResultType, ProgramsFetchResult } from '../types/program-fetch-result.type';
import { VideoModel } from '../types/video-type';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) { }

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrls.moviesUrl;

  public async getMoviesByCategory(movieCategory: MovieCategories, page?: string): Promise<ProgramResultType[]> {
    const moviesList = (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${movieCategory}?api_key=${this.apiKey}${page ? '&page=' + page : null}`)).then(result=> {
      return {
        movies: result.results,
        pages:total_pages,
      }
    }))

  }

  public async getSimilarMovies(similarMovieId: string | number):Promise<ProgramResultType[]> {
    return (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${similarMovieId}/recommendations?api_key=17acd9c39b103a235bc6dcaa22e3957a`))).results
  }

  public async getMovieById(movieId: number): Promise<ProgramResultType> {
    return (await firstValueFrom(this.http.get<ProgramResultType>(`${this.apiUrl}/${movieId}?api_key=17acd9c39b103a235bc6dcaa22e3957a`)));
  }

  public async getMovieTrailer(id: number): Promise<string> {
    return await firstValueFrom(this.http.get<VideoModel>(`${this.apiUrl}/${id}/videos?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results.find(result => result.name === 'Official Trailer')),
      map(response=> `https://www.youtube.com/embed/${response?.key}`)
    ))
  }

  public async getMoviesSearchBar(value: string | null): Promise<ProgramResultType[]> {
    return await firstValueFrom(this.http.get<ProgramsFetchResult>(`https://api.themoviedb.org/3/search/movie?api_key=17acd9c39b103a235bc6dcaa22e3957a&query=${value}`).pipe(
      map(movies => movies.results)
    ))
  }

  public async getMoviesCast(id: number): Promise<{}> {
    return await firstValueFrom(this.http.get(`${this.apiUrl}/${id}/credits?api_key=17acd9c39b103a235bc6dcaa22e3957a`))
  }
}
