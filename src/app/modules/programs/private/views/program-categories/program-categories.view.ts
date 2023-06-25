import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCategories, MoviesResultType, ProgramType, SeriesCategories, SeriesResultType } from '../../types/program-fetch-result.type';
import { SeriesService } from '../../services/series.service';
import { MoviesService } from '../../services/movies.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: "./program-categories.view.html",
  styleUrls: ["./program-categories.view.scss"],
  selector: "program-categories-view"
})

export class ProgramCategoriesView {

  public programCategory?: MovieCategories | SeriesCategories;
  public typeOfProgram!: ProgramType;
  public programData!: Array<MoviesResultType | SeriesResultType>;
  public currentPage!: string;
  public isLoading!: boolean;
  public isMobile$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);


  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe({
      next:(url => {
        this.typeOfProgram = url[0].path as ProgramType;
        this.programCategory = url[1].path as MovieCategories | SeriesCategories;
        this.currentPage = url[2].path;
        this.fetchShelvesData();
      })
    })
  }

  async fetchShelvesData() {
    this.isLoading = true;
    if (this.programCategory) {
      if (this.typeOfProgram === "movies") {
        this.programCategory === 'airing_today' ? this.programCategory = 'now_playing' : null;
        this.programCategory === 'on_the_air' ? this.programCategory = 'upcoming' : null;
        this.programData = await this.moviesService.getMoviesByCategory(this.programCategory as MovieCategories, Number(this.currentPage));
        this.programData.forEach(program=> {
          program.media_type = 'movies'
        })
      } else {
        this.programCategory === 'now_playing' ? this.programCategory = 'airing_today' : null;
        this.programCategory === 'upcoming' ? this.programCategory = 'on_the_air' : null;

        this.programData = await this.seriesService.getSeriesByCategory(this.programCategory as SeriesCategories, Number(this.currentPage));
        this.programData.forEach(program=> {
          program.media_type = 'tv'
        })
      }
    }
    this.isLoading = false;
  }

  public navigatePages(plus: boolean): void {
    const currentPage = Number(this.activatedRoute.snapshot.params["page"]);
    if (currentPage === 1 && !plus) return;

    this.router.navigate(['/programs', this.typeOfProgram, this.programCategory, plus ? currentPage + 1 : currentPage - 1])
  }

  public switchProgram() {
    if (this.typeOfProgram === 'movies') {
      this.typeOfProgram = 'tv';
    } else {
      this.typeOfProgram = 'movies'
    }
    this.router.navigate(['/programs/', this.typeOfProgram, this.programCategory, this.currentPage])
  }

}
