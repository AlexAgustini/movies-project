import { SliderImages } from './../../models/slider-images.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramResultType, ProgramType } from '../../models/program-fetch-result.model';

@Component({
  selector: 'app-movie-shelf',
  templateUrl: './movie-shelf.component.html',
  styleUrls: ['./movie-shelf.component.scss']
})

export class MovieShelfComponent implements OnInit{

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {};

  @Input()
  public programData!: Array<ProgramResultType>;

  @Input()
  public typeOfProgram?: ProgramType;

  @Input()
  public mode?: string;

  @Input()
  public similarProgramsShelf?: number;

  @Input()
  public title?: string;

  public isLoading: boolean = false;
  public hasError: boolean = false;
  public carouselImages: SliderImages[] = [];
  public currentPage!: number;

  ngOnInit() {
    if (this.mode === "carousel") this.assembleCarrouselData();
    if (this.similarProgramsShelf) this.assembleSimilarMoviesData();
  };

  private assembleCarrouselData() {
    if (!this.programData) return;
    this.programData.forEach(program=> {
      this.carouselImages.push({
        id: program.id,
        image: `https://image.tmdb.org/t/p/w500${program.poster_path}`,
        thumbImage: `https://image.tmdb.org/t/p/w500${program.poster_path}`
      });
    })
  }

  private assembleSimilarMoviesData() {

  }

  goToMovieDetail(index: number): void {
    const movieId = this.programData[index].id
    this.router.navigate([`/${this.typeOfProgram}`, movieId])
  }

  handlePages(e: any): void {

    if (e.pageIndex === 0) {
      e.pageIndex = 1
    }

    this.router.navigate(['movies', this.typeOfProgram, e.pageIndex])
    this.currentPage = e.pageIndex
  }

}
