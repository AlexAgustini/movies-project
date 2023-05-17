import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ProgramResultType } from '../../types/program-fetch-result.type';

@Component({
  selector: 'search-page-view',
  templateUrl: './search-page.view.html',
  styleUrls: ['./search-page.view.scss']
})
export class SearchPageView implements OnInit{

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
