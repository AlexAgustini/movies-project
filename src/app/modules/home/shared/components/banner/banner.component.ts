import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SidenavService } from 'src/app/common/services/sidenav.service';
import { MoviesService } from 'src/app/modules/programs/private/services/movies.service';
import { SeriesService } from 'src/app/modules/programs/private/services/series.service';
import { SeriesResultType } from 'src/app/modules/programs/private/types/program-fetch-result.type';
import { ProgramResultType } from 'src/app/modules/programs/private/types/program-fetch-result.type';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {

  private ngbCarousel!: NgbCarousel;

 @ViewChild('ngbCarousel') set content(content: NgbCarousel) {
    if(content) {
        this.ngbCarousel = content;
    }
 }

  constructor(
    private moviesService: MoviesService,
    private sidenavService: SidenavService,
    private seriesService: SeriesService,
    private breakpointObserver: BreakpointObserver
  ) {};

  public $sidenavStatus!: Observable<"closed" | "open">
  public programsData!: (ProgramResultType | SeriesResultType)[];
  public isLoading: boolean = false;
  public isMobile$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  ngOnInit() {
    this.getPrograms();
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
  }

  private async getPrograms() {
    this.isLoading = true;
    let moviesList = await this.moviesService.getMoviesByCategory("popular");
    moviesList = await Promise.all(moviesList.map(async (movie) => {
      movie.media_type = 'movies';
      const movieCast = await this.moviesService.getMoviesCast(movie.id);
      return movie = { ...movie, ...movieCast };
    }));

    let seriesList = await this.seriesService.getSeriesByCategory("top_rated");
    seriesList = await Promise.all(seriesList.map(async series=> {
      series.media_type = 'tv';
      const seriesCast = await this.seriesService.getSeriesCast(series.id);
      return series = {...series, ...seriesCast}
    } ))

    const programsData = this.shuffleArray([...moviesList, ...seriesList]);
    this.programsData = programsData;
    this.isLoading = false;
  };

  public getFlagImage(language: string): string {
    switch (language) {
      case 'en':
        return '../../../../assets/usa-flag.svg'
    }
    return '../../../../assets/usa-flag.svg'
  }

  public getLanguage(language: string): string {
    switch (language) {
      case 'en':
        return 'English'
    }
    return 'English'
  }

  public nextSlide() {
    this.ngbCarousel.next();
  }

  public previousSlide() {
    this.ngbCarousel.prev();
  }

  private shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
