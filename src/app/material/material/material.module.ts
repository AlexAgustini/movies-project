import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

const MAT_MODULES = [
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  exports: [
    MAT_MODULES
  ]
})
export class MaterialModule { }
