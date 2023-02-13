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

 getMovies(): Observable<{ popular: Movie[], latest: Movie[], upcoming: Movie[], topRated: Movie[] }> {
    const popular = this.http.get<MoviesResult>(`https://api.themoviedb.org/3/movie/popular?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results),
      map(results => results.map(result => ({...result, type_of_shelf: 'Popular'}))))

    const latest = this.http.get<MoviesResult>(`https://api.themoviedb.org/3/movie/now_playing?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results),
      map(results => results.map(result => ({...result, type_of_shelf: 'Latest'}))))

    const topRated = this.http.get<MoviesResult>(`https://api.themoviedb.org/3/movie/top_rated?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results),
      map(results => results.map(result => ({...result, type_of_shelf: 'Top rated'}))))

    const upcoming = this.http.get<MoviesResult>(`https://api.themoviedb.org/3/movie/upcoming?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results),
      map(results => results.map(result => ({...result, type_of_shelf: 'Upcoming'}))))


    return forkJoin([popular, latest, upcoming, topRated]).pipe(
      map(([popular, latest, upcoming, topRated]) => ({ popular, latest, upcoming, topRated }))
    );
  }


  getMovie(id: number): Observable<Movie> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response as Movie)
    );
  }

}
