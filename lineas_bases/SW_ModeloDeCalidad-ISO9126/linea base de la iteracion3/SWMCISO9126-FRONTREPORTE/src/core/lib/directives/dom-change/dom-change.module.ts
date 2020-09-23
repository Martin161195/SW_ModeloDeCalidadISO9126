import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  declarations: [
    DomChangeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomChangeDirective
  ],
  providers: []
})
export class DomChangeModule { }
