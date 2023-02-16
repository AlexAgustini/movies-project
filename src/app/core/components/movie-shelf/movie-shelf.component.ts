import { SliderImages } from './../../models/slider-images.model';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from './../../models/movie.model';
import { MoviesService } from './../../services/movies-service';
import { ActivatedRoute, Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { MoviesResult } from '../../models/movie-result.model';

@Component({
  selector: 'app-movie-shelf',
  templateUrl: './movie-shelf.component.html',
  styleUrls: ['./movie-shelf.component.scss']
})
export class MovieShelfComponent implements OnInit{

  constructor(private moviesService: MoviesService, private router: Router, private activatedRoute: ActivatedRoute) {};

  @Input()
  public typeOfMovies?: string;

  @Input()
  public mode?: string;

  @Input()
  public similarMoviesShelf?: number;

  @Input()
  public title?: string;

  public isLoading: boolean = false;
  public hasError: boolean = false;


  ngOnInit() {
    this.mode = this.mode != null ? this.mode : "carousel";
    this.currentPage = this.activatedRoute.snapshot.params['id'];

    this.getTypeOfMovie();

  };

  ngOnChanges() {
    this.currentPage = this.activatedRoute.snapshot.params['id'];
    this.getTypeOfMovie();
  }

  moviesList!: Movie[];
  carouselImages!: SliderImages[];  

  currentPage!: number;
  totalResults!: number;
  totalPages!: number;

  getTypeOfMovie() {

    if (!this.typeOfMovies && this.similarMoviesShelf === null) {
      return;
    }

    this.isLoading = true;
    this.hasError = false;

      this.moviesService.getTypeOfMovie(this.typeOfMovies, this.currentPage, this.similarMoviesShelf).subscribe({
          next: (response: MoviesResult) => {
            console.log(response);

            if (!Array.isArray(response.results)) {
              this.hasError = true;
              this.isLoading = false;
              return;
            }
            this.moviesList = response.results;
            this.totalPages = response.total_pages;
            this.totalResults = response.total_results;
            this.carouselImages = this.moviesList.map((movie) => {
              return {
                image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                thumbImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                id: movie.id
              }
            })
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
            this.hasError = true;
          }
      });
    };

  goToMovieDetail(index: number) {
    const movieId = this.moviesList[index].id

    this.router.navigate(['/movie', movieId])
  }

  handlePages(e: any) {

    if (e.pageIndex === 0) {
      e.pageIndex = 1
    }

    this.router.navigate(['movies', this.typeOfMovies, e.pageIndex])
    this.currentPage = e.pageIndex
    this.getTypeOfMovie()
  }

}
