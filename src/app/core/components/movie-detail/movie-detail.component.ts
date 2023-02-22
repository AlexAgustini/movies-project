import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {};

  currentMovie!: Movie;
  currentMovieId!: number;
  videoUrl!: string | null;

  ngOnInit() {
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
