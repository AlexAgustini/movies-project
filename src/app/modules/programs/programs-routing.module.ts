import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramCategoriesView } from './private/views/program-categories/program-categories.view';
import { ProgramDetailView } from './private/views/program-detail/program-detail.view';
import { SearchPageView } from './private/views/search/search-page.view';
import { FavoritesView } from './private/views/favorites/favorites.view';

const routes: Routes = [
  {
    path: "search",
    component: SearchPageView
  },
  {
    path: "movies/:id",
    component: ProgramDetailView
  },
  {
    path: 'movies/:program_category/:page',
    component: ProgramCategoriesView
  },
  {
    path: 'tv/:program_category/:page',
    component: ProgramCategoriesView
  },
  {
    path: "tv/:id",
    component: ProgramDetailView
  },
  {
    path: "favorites/:page",
    component: FavoritesView,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
