import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramResultType } from '../../models/program-fetch-result.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {}

  public isLoading: boolean = false;
  public hasError: boolean = false;

  queryMade!: string | null;
  moviesReturned!: ProgramResultType[];

  ngOnInit() {
    this.queryMade = this.activatedRoute.snapshot.queryParamMap.get('q');
    this.isLoading = true;

    this.moviesService.getMoviesSearchBar(this.queryMade).subscribe({
      next: (movies) => {
        this.moviesReturned = movies
        this.isLoading = false
      },
      error: (err) => {
        this.hasError = true;
        this.isLoading = false
        console.error(err);
      }
    })
  }

  ngOnChanges() {
    this.moviesService.getMoviesSearchBar(this.queryMade).subscribe(movies => {
      this.moviesReturned = movies
    })
  }


}
