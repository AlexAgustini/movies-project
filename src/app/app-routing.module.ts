import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './core/components/movie-detail/movie-detail.component';
import { HomeComponent } from './core/components/home/home.component';
import { MoviesOfTypeComponent } from './core/components/movies-of-type/movies-of-type.component';
import { SearchPageComponent } from './core/components/search-page/search-page.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'movie/:id', component: MovieDetailComponent
  },

  {
    path: 'movies/:type_of_movie/:id', component: MoviesOfTypeComponent
  },

  {
    path: 'movies/search', component: SearchPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
