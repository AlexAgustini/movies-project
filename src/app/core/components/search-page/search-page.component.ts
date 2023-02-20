import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {}

  queryMade!: string | null;
  moviesReturned!: Movie[];

  ngOnInit() {

    this.queryMade = this.activatedRoute.snapshot.queryParamMap.get('q')

    this.moviesService.getMoviesSearchBar(this.queryMade).subscribe(movies => {
      this.moviesReturned = movies
    })
  }

  ngOnChanges() {
    this.queryMade = this.activatedRoute.snapshot.queryParamMap.get('q')

    this.moviesService.getMoviesSearchBar(this.queryMade).subscribe(movies => {
      this.moviesReturned = movies
    })
  }

}
