import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramResultType, ProgramType } from '../../models/program-fetch-result.model';
import { MoviesService } from '../../services/movies.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent implements OnInit {

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
    // this.isLoading = true;
    // if (this.currentProgramType === "movies") {

    //   await this.moviesService.getMovieById(this.currentProgramId).then(result=> this.currentProgram = result)
    //   await this.moviesService.getMovieTrailer(this.currentProgramId).toPromise().then(response => {
    //     if (response) {
    //       this.videoUrl = `https://www.youtube.com/embed/${response.key}`
    //     } else {
    //       this.videoUrl = null
    //     }
    //   })
    // };

    // this.isLoading = false;
  }
}
