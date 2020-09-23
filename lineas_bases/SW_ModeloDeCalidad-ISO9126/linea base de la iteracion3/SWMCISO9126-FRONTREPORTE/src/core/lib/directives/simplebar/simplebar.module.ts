import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SimpleBarDirective } from './simplebar.directive';

@NgModule({
  declarations: [
    SimpleBarDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleBarDirective
  ],
  providers: []
})
export class SimplebarModule { }
