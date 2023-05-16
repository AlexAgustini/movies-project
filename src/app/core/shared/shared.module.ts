import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { MovieShelfComponent } from './movie-shelf/movie-shelf.component';
import { SimilarProgramsShelfComponent } from './similar-programs-shelf/similar-programs-shelf.component';

const COMPONENTS = [
  SearchBarComponent,
  MovieShelfComponent,
  SimilarProgramsShelfComponent
]

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    NgImageSliderModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class SharedModule { }
