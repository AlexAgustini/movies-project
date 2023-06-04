import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent{

  public searchValue!: string;

  constructor(private router: Router) {}

  search(value: string): void {
    this.searchValue = value;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`programs/search`], {queryParams: {q: value}}));
  }

  setValue(value: string) {
    this.searchValue = value;
  }

}
