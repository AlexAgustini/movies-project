import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramResultType, ProgramType } from '../../models/program-fetch-result.model';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'similar-movies-shelf',
  templateUrl: './similar-programs-shelf.component.html',
  styleUrls: ['./similar-programs-shelf.component.scss'],
})

export class SimilarProgramsShelfComponent implements OnInit{

  constructor(private router: Router, private moviesService: MoviesService, private seriesService: SeriesService) {};

  @Input() public programId!: string | number;
  @Input() public programType!: ProgramType

  public programsData!: Array<ProgramResultType>
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
      await this.moviesService.getSimilarMovies(this.programId).then(result=> this.programsData = result);
    } else {
      this.seriesService
    }
    this.isLoading = false;
  }
}
