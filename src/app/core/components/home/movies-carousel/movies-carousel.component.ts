import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesResult } from 'src/app/core/models/movie-result.model';
import { Movie } from 'src/app/core/models/movie.model';
import { SliderImages } from 'src/app/core/models/slider-images.model';
import { MoviesService } from 'src/app/core/services/movies-service';

@Component({
  selector: 'app-movies-carousel',
  templateUrl: './movies-carousel.component.html',
  styleUrls: ['./movies-carousel.component.scss']
})
export class MoviesCarouselComponent implements OnInit {



  ngOnInit() {
    console.log('a')
  }


}
