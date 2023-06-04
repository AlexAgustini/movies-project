import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { MoviesService } from '../../services/movies.service';
import { MoviesResultType, SeriesResultType } from '../../../private/types/program-fetch-result.type';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.view.html',
  styleUrls: ['./favorites.view.scss']}
  )
export class FavoritesView {

  public isLoading!: boolean;
  public currentPage!: number;
  public programData!: Array<MoviesResultType | SeriesResultType>;
  public allProgramsLength!: number;

  constructor(
    private favoritesService: FavoritesService,
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=> {
      this.currentPage = Number(params["page"]);
      this.fetchData();
    })
  }

  private async fetchData() {
    this.isLoading = true;
    const programsPerPage = 15;
    const startIndex = (this.currentPage - 1) * programsPerPage;
    const endIndex = startIndex + programsPerPage;
    const favoritePrograms = await this.favoritesService.getFavoritePrograms();
    this.allProgramsLength = favoritePrograms.length;
    const programsData = favoritePrograms.slice(startIndex, endIndex);
    this.programData = await Promise.all(programsData.map(async (program) => {
      if (program.type === "movies") {
        return await this.moviesService.getMovieById(program.id);
      } else {
        return await this.seriesService.getSeriesById(program.id);
      }
    }));

    this.programData.forEach(program=> {
      if (Object.hasOwn(program, "title")) {
        program.media_type = 'movies'
      } else {
        program.media_type = 'tv';
      }
    })

    this.isLoading = false;
  }

  public removeFavorite(programId: number) {
    this.programData.splice(this.programData.findIndex(program=> program.id === programId), 1);
  }

  public navigatePages(plus: boolean): void {
    if (this.currentPage === 1 && !plus) return;

    this.router.navigate(['/programs', 'favorites', plus ? this.currentPage + 1 : this.currentPage - 1]);
  }

  public get displayNextPageCondition() {
    return this.allProgramsLength > this.currentPage * 15;
  }
}


