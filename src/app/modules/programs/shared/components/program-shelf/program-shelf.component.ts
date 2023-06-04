import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { FavoritesService } from '../../../private/services/favorites.service';
import { MoviesResultType, ProgramType, SeriesResultType } from '../../../private/types/program-fetch-result.type';
import { SliderImages } from '../../../private/types/slider-images.type';
import { trigger, transition, style, animate } from '@angular/animations';
import { SidenavService } from 'src/app/common/services/sidenav.service';

@Component({
  selector: 'program-shelf',
  templateUrl: './program-shelf.component.html',
  styleUrls: ['./program-shelf.component.scss'],
  animations: [
    trigger('fadeAnimation', [
    transition(':leave',
      [style({ transform: 'translateY(0)', opacity: 1 }), animate('300ms ease', style({ transform: 'translateY(-70px)', opacity: 0 }))]
    )
  ])]
})

export class ProgramShelfComponent implements OnInit{

  constructor(private router: Router, private favoritesService: FavoritesService, private sidenavService: SidenavService) {};

  @Input()
  public programData!: Array<MoviesResultType | SeriesResultType>;

  @Input()
  public typeOfProgram?: ProgramType;

  @Input()
  public mode?: string;

  @Input()
  public title?: string;

  @Output()
  public programFavorited = new EventEmitter();


  public isLoading: boolean = false;
  public hasError: boolean = false;
  public carouselImages: SliderImages[] = [];
  public currentPage!: number;
  public favoritedMovies!: Array<number>
  public sidenavStatus$ = this.sidenavService.$sidenavStatus;

  async ngOnInit() {
    await this.checkForFavoritePrograms();
    if (this.mode === "carousel") this.assembleCarrouselData();
  };

  private assembleCarrouselData() {
    if (!this.programData) return;
    this.programData.forEach(program=> {
      Object.hasOwn(program, "poster_path") ? program.media_type = 'movies' : program.media_type = 'tv';

      this.carouselImages.push({
        id: program.id,
        image: `https://image.tmdb.org/t/p/w500${program.poster_path}`,
        thumbImage: `https://image.tmdb.org/t/p/w500${program.poster_path}`
      });
    })
  }

  public goToMovieDetail(index: number): void {
    const movieId = this.programData[index].id
    this.router.navigate([`/programs/${this.typeOfProgram}`, movieId])
  }

  public toggleFavoriteProgram(program: MoviesResultType | SeriesResultType) {
    if (!program.programFavorited) {
      this.favoritesService.addFavoriteProgram(program.id, program.media_type)
      program.programFavorited = true;
    } else {
      this.favoritesService.removeFavoriteProgram(program.id, program.media_type)
      program.programFavorited = false;
    }

    this.programFavorited.emit(program.id);
  }

  private async checkForFavoritePrograms() {
    const userFavoritedMovies = await this.favoritesService.getFavoritePrograms()
    if (!userFavoritedMovies) return;
    this.programData.forEach(program=> {
      if (userFavoritedMovies.some(favoritedProgram => favoritedProgram.id === program.id)) {
        program.programFavorited = true;
      }
    })
  }
}
