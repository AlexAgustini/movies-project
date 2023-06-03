import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { MoviesService } from '../../services/movies.service';
import { ProgramResultType } from '../../../private/types/program-fetch-result.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.view.html',
  styleUrls: ['./favorites.view.scss']}
  )
export class FavoritesView {

  public isLoading!: boolean;
  public currentPage!: number;
  public programData!: Array<ProgramResultType>;
  public allProgramsLength!: number;

  constructor(
    private favoritesService: FavoritesService,
    private moviesService: MoviesService,
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
    const programsIds = favoritePrograms.slice(startIndex, endIndex);
    this.programData = await Promise.all(programsIds.map(async (programId) => {
      return await this.moviesService.getMovieById(programId);
    }));

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


