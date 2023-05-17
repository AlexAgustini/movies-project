import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD:src/app/modules/programs/private/views/program-detail/program-detail.view.ts
=======
import { ISeriesResult, ProgramResultType, ProgramType } from '../../models/program-fetch-result.model';
>>>>>>> 0f96549605c34c684881a29a69f0f83b8a0df62a:src/app/core/components/program-detail/program-detail.component.ts
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

  moviesType!: ProgramResultType
  public currentProgram!: ProgramResultType | ISeriesResult;
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
      await this.moviesService.getMovieTrailer(this.currentProgramId).then(response => {
        response ? this.videoUrl = response : null;
      })
    } else {
      await this.seriesService.getSeriesById(this.currentProgramId).then(result=> this.currentProgram = result)
      await this.seriesService.getSeriesTrailer(this.currentProgramId).then(response => {
        response ? this.videoUrl = response : null;
      })
      console.log(this.currentProgram)
    };

    this.isLoading = false;
  }
}
