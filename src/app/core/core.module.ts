import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material/material.module';

import { DashboardComponent } from './components/header/dashboard.component';
import { ProgramDetailComponent } from './components/program-detail/program-detail.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesOfTypeComponent } from './components/movies-of-type/movies-of-type.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './components/home/banner/banner.component';
import { SharedModule } from './shared/shared.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MoviesCarouselComponent } from './components/home/movies-carousel/movies-carousel.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './safePipe/safePipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const COMPONENTS = [
  DashboardComponent,
  ProgramDetailComponent,
  HomeComponent,
  MoviesOfTypeComponent,
  FooterComponent,
  BannerComponent,
  SearchPageComponent,
  MoviesCarouselComponent,
  LoginComponent,
  SafePipe,
  SidebarComponent,
]

const MODULES = [
  CommonModule,
  AppRoutingModule,
  MaterialModule,
  NgbCarouselModule,
  SharedModule,
  NgImageSliderModule,
  FormsModule,
  ReactiveFormsModule,
]

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [MODULES],
  exports: [
    COMPONENTS
  ],
})
export class CoreModule { }
