import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { DashboardComponent } from './components/header/dashboard.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieShelfComponent } from './components/movie-shelf/movie-shelf.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesOfTypeComponent } from './components/movies-of-type/movies-of-type.component';
import { FooterComponent } from './components/footer/footer/footer.component';


const COMPONENTS = [
  DashboardComponent,
  MovieDetailComponent,
  MovieShelfComponent,
  HomeComponent,
  MoviesOfTypeComponent,
  FooterComponent
]

const MODULES = [
  CommonModule,
  AppRoutingModule,
  MaterialModule,
  NgImageSliderModule,
]

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  exports: [
    COMPONENTS
  ]
})
export class CoreModule { }
