import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VMSingleBarComponent } from './simgle-bar/vm-single-bar.component';
import { VMProgressBarComponent } from './vm-progress-bar.component';

@NgModule({
  declarations: [
    VMProgressBarComponent,
    VMSingleBarComponent
  ],
  imports: [CommonModule],
  exports: [
    VMProgressBarComponent,
    VMSingleBarComponent
  ]
})
export class VMProgressBarModule { }
