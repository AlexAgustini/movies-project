import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/common/angular-material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeView } from './private/views/home.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutingModule } from './home-routing.module';
import { ProgramsModule } from '../programs/programs.module';

@NgModule({
  declarations: [
    HomeView,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    HomeRoutingModule,
    ProgramsModule
  ]
})
export class HomeModule { }
