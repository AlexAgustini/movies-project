import { Component } from '@angular/core';
import { ProgramResultType } from '../../models/program-fetch-result.model';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  selector: "home-component"
})
export class HomeComponent {

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
