import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { SafePipe } from './safePipe/safePipe';

import { DashboardComponent } from './components/header/dashboard.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesOfTypeComponent } from './components/movies-of-type/movies-of-type.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './components/home/banner/banner.component';
import { SharedModule } from './shared/shared.module';
import { SearchPageComponent } from './components/search-page/search-page.component';

const COMPONENTS = [
  DashboardComponent,
  MovieDetailComponent,
  HomeComponent,
  MoviesOfTypeComponent,
  FooterComponent,
  SafePipe,
  BannerComponent
]

const MODULES = [
  CommonModule,
  AppRoutingModule,
  MaterialModule,
  NgbCarouselModule,
  SharedModule
]

@NgModule({
  declarations: [
    COMPONENTS,
    SearchPageComponent,
  ],
  imports: [
    MODULES
  ],
  exports: [
    COMPONENTS
  ]
})
export class CoreModule { }
