import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './core/components/movie-detail/movie-detail.component';
import { HomeComponent } from './core/components/home/home.component';
import { MoviesOfTypeComponent } from './core/components/movies-of-type/movies-of-type.component';
import { SearchPageComponent } from './core/components/search-page/search-page.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/auth.guard'

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'movie/:id', component: MovieDetailComponent, canActivate: [AuthGuard]
  },

  {
    path: 'movies/:type_of_movie/:id', component: MoviesOfTypeComponent, canActivate: [AuthGuard]
  },

  {
    path: 'movies/search', component: SearchPageComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
