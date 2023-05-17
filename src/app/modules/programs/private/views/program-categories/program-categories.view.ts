import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
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

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private seriesService: SeriesService) {}

  ngOnInit() {
    const programCategory$ = this.activatedRoute.params.pipe(
      map(params => params["program_category"])
    );

    const programType$ = this.activatedRoute.url.pipe(
      map(url => url[0].path)
    );

    combineLatest([programType$, programCategory$]).subscribe(([programType, programCategory]) => {
      this.typeOfProgram = programType as ProgramType;
      this.programCategory = programCategory;
      this.fetchShelvesData();
    });
  }

  async fetchShelvesData() {
    if (this.programCategory) {

      if (this.typeOfProgram === "movies") {

        this.programData = await this.moviesService.getMoviesByCategory(this.programCategory as MovieCategories);
      } else {
        this.programData = await this.seriesService.getSeriesByCategory(this.programCategory as SeriesCategories);
      }

    }
  }
}
