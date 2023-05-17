import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './common/helpers/guards/auth.guard'

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: "",
      loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule),
      canActivate: [AuthGuard]
    },
    {
      path: "programs",
      loadChildren: ()=> import('./modules/programs/programs.module').then(m => m.ProgramsModule),
      canActivate: [AuthGuard]
    },
    {
      path: "login",
      loadChildren: ()=> import('./modules/login/auth.module').then(m => m.AuthModule),
      canActivate: [AuthGuard]
    },
    {
      path: "account",
      loadChildren: ()=> import('./modules/account/account.module').then(m => m.AccountModule),
      canActivate: [AuthGuard]
    },
  ], {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
