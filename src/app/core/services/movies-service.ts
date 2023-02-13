import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { Observable, map, of, forkJoin } from 'rxjs';
import { MoviesResult } from '../models/movie-result.model';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) { }


  getTypeOfMovie(string: string) {
    return this.http.get<MoviesResult>(`https://api.themoviedb.org/3/movie/${string}?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results)
    )
  }


  getMovie(id: number): Observable<Movie> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response as Movie)
    );
  }

}