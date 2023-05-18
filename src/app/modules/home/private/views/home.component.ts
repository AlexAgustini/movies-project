import { Component } from '@angular/core';
import { MoviesService } from 'src/app/modules/programs/private/services/movies.service';
import { SeriesService } from 'src/app/modules/programs/private/services/series.service';
import { ProgramResultType } from 'src/app/modules/programs/private/types/program-fetch-result.type';

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  selector: "home-component"
})
export class HomeView {

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) {}

  public dataFetched: boolean = false;

  public popularMoviesList!: Array<ProgramResultType>
  public popularSeriesList!: Array<ProgramResultType>
  public topRatedMoviesList!: Array<ProgramResultType>
  public upcomingMoviesList!: Array<ProgramResultType>

  ngOnInit() {
    this.fetchShelvesData()
  }

  async fetchShelvesData() {
    this.popularMoviesList = await this.moviesService.getMoviesByCategory("popular");
    this.popularSeriesList = await this.seriesService.getSeriesByCategory("top_rated");
    this.topRatedMoviesList = await this.moviesService.getMoviesByCategory("top_rated");
    this.upcomingMoviesList = await this.moviesService.getMoviesByCategory("upcoming");
    this.dataFetched = true;
  }
}