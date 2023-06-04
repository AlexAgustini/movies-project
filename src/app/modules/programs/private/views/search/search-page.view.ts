import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MoviesResultType } from '../../types/program-fetch-result.type';

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
  moviesReturned!: MoviesResultType[];

  ngOnInit() {
    this.queryMade = this.activatedRoute.snapshot.queryParamMap.get('q');
    this.isLoading = true;

    this.moviesService.getMoviesSearchBar(this.queryMade).then(result=> {
      this.moviesReturned = result;
      this.isLoading = false
    }).catch(error=> {
      this.hasError = true;
      this.isLoading = false
    })
  }

  ngOnChanges() {
    this.moviesService.getMoviesSearchBar(this.queryMade).then(result=> {
      this.moviesReturned = result;
      this.isLoading = false
    })
  }
}
