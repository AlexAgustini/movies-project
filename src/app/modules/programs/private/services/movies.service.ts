import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD:src/app/modules/programs/private/services/movies.service.ts
import { Observable, map, firstValueFrom } from 'rxjs';
=======
import { Observable, map, filter, firstValueFrom } from 'rxjs';
import { individualVideo, videoModel } from '../models/video-model';
>>>>>>> 0f96549605c34c684881a29a69f0f83b8a0df62a:src/app/core/services/movies.service.ts
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

  public async getMoviesByCategory(movieCategory: MovieCategories): Promise<ProgramResultType[]> {
    const moviesList = (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${movieCategory}?api_key=${this.apiKey}`))).results;
    return moviesList.filter(movie=> !movie.adult && movie.original_language === "pt" || movie.original_language === "pt" || movie.original_language === "en");
  }

  public async getSimilarMovies(similarMovieId: string | number):Promise<ProgramResultType[]> {
    return (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${similarMovieId}/recommendations?api_key=17acd9c39b103a235bc6dcaa22e3957a`))).results
  }

  public async getMovieById(movieId: number): Promise<ProgramResultType> {
    return (await firstValueFrom(this.http.get<ProgramResultType>(`${this.apiUrl}/${movieId}?api_key=17acd9c39b103a235bc6dcaa22e3957a`)));
  }

<<<<<<< HEAD:src/app/modules/programs/private/services/movies.service.ts
  getMovieTrailer(id: number) {
    return this.http.get<VideoModel>(`${this.apiUrl}/${id}/videos?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
=======
  public async getMovieTrailer(id: number):Promise<string> {
    return firstValueFrom(this.http.get<videoModel>(`${this.apiUrl}/${id}/videos?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
>>>>>>> 0f96549605c34c684881a29a69f0f83b8a0df62a:src/app/core/services/movies.service.ts
      map(response => response.results.find(result => result.name === 'Official Trailer')),
      map(response=> `https://www.youtube.com/embed/${response?.key}`)
    ));
  }

  public getMoviesSearchBar(value: string | null): Observable<ProgramResultType[]> {
    return this.http.get<ProgramsFetchResult>(`https://api.themoviedb.org/3/search/movie?api_key=17acd9c39b103a235bc6dcaa22e3957a&query=${value}`).pipe(
      map(movies => movies.results)
    )
  }

  public async getMoviesCast(id: number): Promise<{}> {
<<<<<<< HEAD:src/app/modules/programs/private/services/movies.service.ts
    return await firstValueFrom(this.http.get(`${this.apiUrl}/${id}/credits?api_key=17acd9c39b103a235bc6dcaa22e3957a`))
=======
    return this.http.get(`${this.apiUrl}/${id}/credits?api_key=17acd9c39b103a235bc6dcaa22e3957a`)
>>>>>>> 0f96549605c34c684881a29a69f0f83b8a0df62a:src/app/core/services/movies.service.ts
  }
}
