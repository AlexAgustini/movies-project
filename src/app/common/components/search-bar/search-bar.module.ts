import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/common/angular-material/material.module';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
