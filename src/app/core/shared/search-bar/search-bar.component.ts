import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent{

  @Input() label = '';

  moviesReturned!: Movie[];

  constructor(private moviesService: MoviesService, private router: Router) {}

  search(value: string): void {
    this.router.navigate([`movies/search`], { queryParams: {q: value} })
  }

}
