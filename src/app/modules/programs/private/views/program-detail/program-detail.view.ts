import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';
import { SeriesResultType, MoviesResultType, ProgramType } from '../../types/program-fetch-result.type';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './program-detail.view.html',
  styleUrls: ['./program-detail.view.scss']
})
export class ProgramDetailView implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private favoritesService: FavoritesService
  ) {};

  public currentProgram!: MoviesResultType | SeriesResultType;
  public currentProgramId!: number;
  public currentProgramType!: ProgramType;
  public videoUrl!: string | null;
  public isLoading!: boolean;

  ngOnInit() {
    this.getUrlParams();
  };

  private async getUrlParams() {
    this.activatedRoute.url.subscribe(url=> {
      this.currentProgramType = url[0].path as ProgramType;
      this.currentProgramId = Number(url[1].path);
      this.fetchProgramData();
      this.checkFavorited();
    })
  }

  private async fetchProgramData() {
    this.isLoading = true;
    if (this.currentProgramType === "movies") {

      await this.moviesService.getMovieById(this.currentProgramId).then(result=> {
        this.currentProgram = result;
        this.currentProgram.media_type = 'movies'
      })
      await this.moviesService.getMovieTrailer(this.currentProgramId).then(response => {
        response ? this.videoUrl = response : null;
      })
    } else {
      await this.seriesService.getSeriesById(this.currentProgramId).then(result=> {
        this.currentProgram = result;
        this.currentProgram.media_type = 'tv';
      })
      await this.seriesService.getSeriesTrailer(this.currentProgramId).then(response => {
        response ? this.videoUrl = response : null;
      })
    };

    this.isLoading = false;
    console.log(this.currentProgram)
  }

  public toggleFavoriteProgram(program: MoviesResultType | SeriesResultType) {
    if (!program.programFavorited) {
      this.favoritesService.addFavoriteProgram(program.id, this.currentProgramType)
      program.programFavorited = true;
    } else {
      this.favoritesService.removeFavoriteProgram(program.id, this.currentProgramType)
      program.programFavorited = false;
    }
  }

  private async checkFavorited() {
    const userFavoritedPrograms = await this.favoritesService.getFavoritePrograms();
    if (!userFavoritedPrograms) return;
    if (!Object.hasOwn(this.currentProgram, "id")) return
    for (let program of userFavoritedPrograms) {
      if (program.id === this.currentProgram.id) {
        this.currentProgram.programFavorited = true;
      }
    }
  }
}
