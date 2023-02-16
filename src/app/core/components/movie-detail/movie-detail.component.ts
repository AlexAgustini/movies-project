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

  getMovieId() {
    const id: number =  this.activatedRoute.snapshot.params['id'];
    this.currentMovieId = id;
    this.moviesService.getMovie(id).subscribe(response => {
      this.currentMovie = response;
    })
  };

  ngOnInit() {
    this.getMovieId();
  };



}
