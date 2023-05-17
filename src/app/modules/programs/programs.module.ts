import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/common/angular-material/material.module';
import { SearchPageView } from './private/views/search/search-page.view';
import { ProgramDetailView } from './private/views/program-detail/program-detail.view';
import { ProgramShelfComponent } from './shared/components/program-shelf/program-shelf.component';
import { ProgramCategoriesView } from './private/views/program-categories/program-categories.view';
import { SimilarProgramsShelfComponent } from './shared/components/similar-programs-shelf/similar-programs-shelf.component';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { SafePipe } from 'src/app/common/pipes/safePipe';
import { ProgramsRoutingModule } from './programs-routing.module';

@NgModule({
  declarations: [
    SearchPageView,
    ProgramDetailView,
    ProgramCategoriesView,
    SimilarProgramsShelfComponent,
    ProgramShelfComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgImageSliderModule,
    ProgramsRoutingModule
  ],
  exports: [
    ProgramShelfComponent
  ]
})
export class ProgramsModule { }
