import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MoviesResult } from '../../../models/movie-result.model';
import { Movie } from '../../../models/movie.model';
import { MoviesService } from '../../../services/movies-service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent {

  constructor(private moviesService: MoviesService) {};

  movies!: Movie[];

  ngOnInit() {
    this.getTypeOfMovie();
  }

  getTypeOfMovie(): void {
      this.moviesService.getTypeOfMovie('popular').subscribe({
          next: (response: MoviesResult) => {
            this.movies = response.results
            console.log(response.results)
          }
        })
    };

    getFlagImage(language: string) {
      switch (language) {
        case 'en':
          return '../../../../assets/usa-flag.svg'
      }
      return '../../../../assets/usa-flag.svg'
    }

    getLanguage(language: string) {
      switch (language) {
        case 'en':
          return 'English'
      }
      return 'English'
    }
}
