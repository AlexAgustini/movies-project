import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCategories, ProgramResultType, ProgramType, SeriesCategories } from '../../types/program-fetch-result.type';
import { SeriesService } from '../../services/series.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  templateUrl: "./program-categories.view.html",
  styleUrls: ["./program-categories.view.scss"],
  selector: "program-categories-view"
})

export class ProgramCategoriesView {

  public programCategory?: MovieCategories | SeriesCategories;
  public typeOfProgram!: ProgramType;
  public programData!: Array<ProgramResultType>;
  public currentPage!: string;
  public isLoading!: boolean;

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private seriesService: SeriesService, private router: Router) {}

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
        this.programData = await this.moviesService.getMoviesByCategory(this.programCategory as MovieCategories, this.currentPage);
      } else {
        this.programData = await this.seriesService.getSeriesByCategory(this.programCategory as SeriesCategories, this.currentPage);
      }
    }
    this.isLoading = false;
  }

  public handlePages(e: any): void {
    if (e.pageIndex === 0) e.pageIndex = 1

    this.router.navigate(['/programs', this.typeOfProgram, this.programCategory, e.pageIndex])
    this.currentPage = e.pageIndex
  }

}