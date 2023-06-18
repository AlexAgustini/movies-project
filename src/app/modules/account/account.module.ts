import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/common/angular-material/material.module';
import { AccountRoutingModule } from './account-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountComponent } from './private/views/account.view';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class AccountModule { }
