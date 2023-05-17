import { Component, ViewChild } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { ProgramResultType } from 'src/app/core/models/program-fetch-result.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {

  @ViewChild('ngbCarousel', { static: true }) carousel!: NgbCarousel;

  constructor(private moviesService: MoviesService, private sidenavService: SidenavService) {};

  public $sidenavStatus!: Observable<"closed" | "open">
  public movies!: ProgramResultType[];
  public isLoading: boolean = false;

  ngOnInit() {
    this.getPrograms();
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
  }

  private async getPrograms() {
    this.isLoading = true;
    let moviesList = await this.moviesService.getMoviesByCategory("popular")

    moviesList = await Promise.all(moviesList.map(async (movie) => {
      const movieCast = await this.moviesService.getMoviesCast(movie.id);
      return movie = { ...movie, ...movieCast };
    }));


    this.movies = moviesList
    console.log(this.movies)
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

  nextSlide() {
    console.log(this.carousel)
    this.carousel.next();
  }

  previousSlide() {
    this.carousel.prev();
  }
}
