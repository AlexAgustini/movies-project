import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { SliderImages } from '../../models/slider-images.model';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movie-shelf',
  templateUrl: './movie-shelf.component.html',
  styleUrls: ['./movie-shelf.component.scss']
})
export class MovieShelfComponent implements OnInit{

  constructor(private moviesService: MoviesService, private router: Router) {}

  popularMovies!: Movie[];
  latestMovies!: Movie[];
  topRatedMovies!: Movie[];
  upcomingMovies!: Movie[];

  popularsImageObject: SliderImages[] = [];
  latestsImageObject: SliderImages[] = [];
  topRatedsImageObject: SliderImages[] = [];
  upcomingsImageObject: SliderImages[] = [];

  ngOnInit() {
    this.moviesService.getMovies().subscribe(({ popular, latest, topRated, upcoming }) => {

      this.popularMovies = popular;
      this.latestMovies = latest;
      this.topRatedMovies = topRated;
      this.upcomingMovies = upcoming;

      this.getImages(this.popularMovies, this.popularsImageObject);
      this.getImages(this.latestMovies, this.latestsImageObject);
      this.getImages(this.upcomingMovies, this.upcomingsImageObject);
      this.getImages(this.topRatedMovies, this.topRatedsImageObject);

    });
  }

  getImages(moviesArray: Movie[], imagesArray: SliderImages[]) {
    moviesArray.map(movie => {
      imagesArray.push({
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        thumbImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        id: movie.id
      })
    });
  }

  goToMovieDetails(index: number, array: SliderImages[]) {
      const imageSelectedId = array[index].id;
      this.router.navigate([imageSelectedId])
  }

}
