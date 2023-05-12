import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { ProgramResultType } from '../../models/program-fetch-result.model';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private seriesService: SeriesService) {};

  typeOfProgram!: ProgramResultType;
  currentProgramId!: number;
  videoUrl!: string | null;

  currentMovie!: ProgramResultType;
  currentMovieId!: number;
  videoUrl!: string | null;

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

    this.getMovie();
  };

  ngOnChanges() {
    this.getMovie();
  }

  getMovie() {

    this.activatedRoute.params.subscribe(routeParams => {
      const movieId = routeParams['id'];
      this.currentMovieId = movieId;
      this.moviesService.getMovie(movieId).subscribe(response => {
        this.currentMovie = response;
      })

      this.moviesService.getTrailers(this.currentMovieId).subscribe(response => {

        if (response) {
          this.videoUrl = `https://www.youtube.com/embed/${response.key}`
        } else {
          this.videoUrl = null
        }
      })
    });
  };



}
