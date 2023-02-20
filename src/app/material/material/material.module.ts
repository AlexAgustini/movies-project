import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MAT_MODULES = [
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MAT_MODULES
  ]
})
export class MaterialModule { }
