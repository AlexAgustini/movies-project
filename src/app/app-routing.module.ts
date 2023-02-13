import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './core/components/movie-detail/movie-detail.component';
import { MovieShelfComponent } from './core/components/movie-shelf/movie-shelf.component';

const routes: Routes = [
  {
    path: '', component: MovieShelfComponent
  },
  {
    path: ':id', component: MovieDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
