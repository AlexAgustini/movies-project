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

  @ViewChild('ngb-carousel', { static: true }) carousel!: NgbCarousel;

  constructor(private moviesService: MoviesService, private sidenavService: SidenavService) {};

  public $sidenavStatus!: Observable<"closed" | "open">
  movies!: ProgramResultType[];
  public isLoading: boolean = false;

  ngOnInit() {
    this.getPrograms();
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
  }

  getPrograms(): void {
    // this.isLoading = true;
    // this.moviesService.getPrograms('popular').subscribe({
    //   next: (movies: MoviesResult) => {

    //     let newArray: Movie[] = [];

    //     for (let movie of movies.results) {
    //       this.moviesService.getCast(movie.id).subscribe(response => {
    //         movie = {...movie, ...response}
    //         newArray.push(movie);
    //       })
    //     }

    //     this.movies = newArray;
    //     this.isLoading = false;
    //   }
    // })
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
    this.carousel.next();
  }

  previousSlide() {
    this.carousel.prev();
  }
}
