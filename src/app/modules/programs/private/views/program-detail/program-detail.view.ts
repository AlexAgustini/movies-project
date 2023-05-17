import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';
import { ProgramResultType, ProgramType } from '../../types/program-fetch-result.type';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './program-detail.view.html',
  styleUrls: ['./program-detail.view.scss']
})
export class ProgramDetailView implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private seriesService: SeriesService) {};

  public currentProgram!: ProgramResultType;
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
    })
  }

  private async fetchProgramData() {
    this.isLoading = true;
    if (this.currentProgramType === "movies") {

      await this.moviesService.getMovieById(this.currentProgramId).then(result=> this.currentProgram = result)
      await this.moviesService.getMovieTrailer(this.currentProgramId).toPromise().then(response => {
        if (response) {
          this.videoUrl = `https://www.youtube.com/embed/${response.key}`
        } else {
          this.videoUrl = null
        }
      })
    };

    this.isLoading = false;
  }
}
