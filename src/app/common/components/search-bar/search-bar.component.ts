import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramResultType } from '../../../modules/programs/private/types/program-fetch-result.type';
import { MoviesService } from '../../../modules/programs/private/services/movies.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent{

  @Input() label = '';

  moviesReturned!: ProgramResultType[];

  constructor(private moviesService: MoviesService, private router: Router) {}

  search(value: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`movies/search`], {queryParams: {q: value}}));
  }

}