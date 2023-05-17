import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeView } from './private/views/home.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: "",
      component: HomeView
    }
  ])],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
