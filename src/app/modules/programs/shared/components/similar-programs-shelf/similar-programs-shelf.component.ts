import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../../private/services/movies.service';
import { SeriesService } from '../../../private/services/series.service';
import { MoviesResultType, ProgramType, SeriesResultType } from '../../../private/types/program-fetch-result.type';

@Component({
  selector: 'similar-movies-shelf',
  templateUrl: './similar-programs-shelf.component.html',
  styleUrls: ['./similar-programs-shelf.component.scss'],
})

export class SimilarProgramsShelfComponent implements OnInit{

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) {};

  @Input() public programId!: string | number;
  @Input() public programType!: ProgramType

  public programsData!: (SeriesResultType | MoviesResultType)[];
  public isLoading!: boolean;

  ngOnInit() {
    this.assembleSimilarMoviesData();
  };

  ngOnChanges() {
    this.assembleSimilarMoviesData();
  }

  private async assembleSimilarMoviesData() {
    this.isLoading = true;
    if (this.programType === "movies") {
      this.programsData = (await this.moviesService.getSimilarMovies(this.programId)).splice(0, 10);
      this.programsData.forEach(program => {
        program.media_type = 'movies'
      });
    } else {
      this.programsData = (await this.seriesService.getSimilarSeries(this.programId)).splice(0, 10)
      this.programsData.forEach(program => {
        program.media_type = 'tv'
      });
    }
    this.isLoading = false;
  }
}
