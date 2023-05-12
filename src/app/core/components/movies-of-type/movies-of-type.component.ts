import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { MovieCategories, ProgramResultType, ProgramType, SeriesCategories } from '../../models/program-fetch-result.model';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';

@Component({
  templateUrl: "./movies-of-type.component.html",
  styleUrls: ["./movies-of-type.component.scss"],
  selector: "movies-of-type-component"
})
export class MoviesOfTypeComponent {

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
