import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MoviesResult } from '../../../models/movie-result.model';
import { Movie } from '../../../models/movie.model';
import { MoviesService } from '../../../services/movies-service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {

  constructor(private moviesService: MoviesService) {};

  movies!: Movie[];
  public isLoading: boolean = false;

  ngOnInit() {
    this.getTypeOfMovie();
  }

  getTypeOfMovie(): void {
    this.isLoading = true;
      this.moviesService.getTypeOfMovie('popular').subscribe({
          next: (movies: MoviesResult) => {

            let newArray: Movie[] = [];

            for (let movie of movies.results) {
              this.moviesService.getCast(movie.id).subscribe(response => {
                movie = {...movie, ...response}
                newArray.push(movie);
              })
            }

            this.movies = newArray;
            this.isLoading = false;
          }
      })
  };

    getFlagImage(language: string): string {
      switch (language) {
        case 'en':
          return '../../../../assets/usa-flag.svg'
      }
      return '../../../../assets/usa-flag.svg'
    }

    getLanguage(language: string): string {
      switch (language) {
        case 'en':
          return 'English'
      }
      return 'English'
    }
}
