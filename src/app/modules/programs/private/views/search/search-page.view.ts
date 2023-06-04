import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MoviesResultType, SeriesResultType } from '../../types/program-fetch-result.type';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'search-page-view',
  templateUrl: './search-page.view.html',
  styleUrls: ['./search-page.view.scss']
})
export class SearchPageView implements OnInit{

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute, private seriesService: SeriesService) {}

  public isLoading: boolean = false;
  public hasError: boolean = false;
  public queryMade!: string | null;
  public moviesData!: (SeriesResultType | MoviesResultType) [];

  ngOnInit() {
    this.queryMade = this.activatedRoute.snapshot.queryParamMap.get('q');
    this.isLoading = true;

    const promises = [this.moviesService.getMoviesSearchBar(this.queryMade), this.seriesService.getSeriesSearchbar(this.queryMade)]

    Promise.all(promises)
      .then(result=> {
        const [movies, series] = result;
        movies.forEach(movie=> {
          movie.media_type = 'movies'
        });
        series.forEach(serie=> {
          serie.media_type = 'tv'
        })
        this.moviesData = [...series, ...movies];
        this.isLoading = false;
      })
  }
}
