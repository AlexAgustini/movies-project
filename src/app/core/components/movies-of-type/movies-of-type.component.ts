import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: "./movies-of-type.component.html",
  styleUrls: ["./movies-of-type.component.scss"],
  selector: "movies-of-type-component"
})
export class MoviesOfTypeComponent {

  public typeOfMovie?: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      this.typeOfMovie = params['type_of_movie'];
    })
  }
}
