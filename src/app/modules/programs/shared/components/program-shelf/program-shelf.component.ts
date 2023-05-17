import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD:src/app/modules/programs/shared/components/program-shelf/program-shelf.component.ts
import { ProgramResultType, ProgramType } from '../../../private/types/program-fetch-result.type';
import { SliderImages } from '../../../private/types/slider-images.type';
=======
import { ProgramResultType, ProgramType } from '../../models/program-fetch-result.model';
import { FavoritesService } from '../../services/favorites.service';
>>>>>>> 0f96549605c34c684881a29a69f0f83b8a0df62a:src/app/core/shared/movie-shelf/movie-shelf.component.ts

@Component({
  selector: 'program-shelf',
  templateUrl: './program-shelf.component.html',
  styleUrls: ['./program-shelf.component.scss']
})

export class ProgramShelfComponent implements OnInit{

  constructor(private router: Router, private favoritesService: FavoritesService) {};

  @Input()
  public programData!: Array<ProgramResultType>;

  @Input()
  public typeOfProgram?: ProgramType;

  @Input()
  public mode?: string;

  @Input()
  public title?: string;


  public isLoading: boolean = false;
  public hasError: boolean = false;
  public carouselImages: SliderImages[] = [];
  public currentPage!: number;
  public favoritedMovies!: Array<number>

  async ngOnInit() {
    await this.checkForFavoritePrograms();
    if (this.mode === "carousel") this.assembleCarrouselData();
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

  public toggleFavoriteProgram(program: ProgramResultType) {
    if (!program.programFavorited) {
      this.favoritesService.addFavoriteProgram(program.id)
      program.programFavorited = true;
    } else {
      this.favoritesService.removeFavoriteProgram(program.id)
      program.programFavorited = false;
    }
  }

  private async checkForFavoritePrograms() {
    const userFavoritedMovies = await this.favoritesService.getFavoritePrograms()
    if (!userFavoritedMovies) return;
    this.programData.forEach(program=> {
      if (userFavoritedMovies.some(favoritedProgram => favoritedProgram === program.id)) {
        program.programFavorited = true;
      }
    })
  }
}
