import { SliderImages } from './../../models/slider-images.model';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from './../../models/movie.model';
import { MoviesService } from './../../services/movies-service';

@Component({
  selector: 'app-movie-shelf',
  templateUrl: './movie-shelf.component.html',
  styleUrls: ['./movie-shelf.component.scss']
})
export class MovieShelfComponent implements OnInit{

  constructor(private moviesService: MoviesService) {};

  @Input()
  public typeOfMovies?: string;

  @Input()
  public mode?: string;

  @Input()
  public title?: string;

  public isLoading: boolean = false;
  public hasError: boolean = false;


  ngOnInit() {
    this.mode = this.mode != null ? this.mode : "carousel";

    this.getTypeOfMovie();
  };

  ngOnChanges() {
    this.getTypeOfMovie();
  }

  moviesList!: Movie[];
  carouselImages!: SliderImages[];

  getTypeOfMovie() {
    if (!this.typeOfMovies) {
      return;
    }
    this.isLoading = true;
    this.hasError = false;
    this.moviesService.getTypeOfMovie(this.typeOfMovies).subscribe({
        next: (response) => {
          if (!Array.isArray(response)) {
            this.hasError = true;
            this.isLoading = false;
            return;
          }
          this.moviesList = response;
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

}
