import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HHMMSS24TO12DatePipe } from './hhmmss24to12-date.pipe';
import { PadStringPipe } from './pad-string.directive';
import { YYYYMMDDDatePipe } from './yyyymmdd-date.directive';

@NgModule({
  declarations: [
    PadStringPipe,
    YYYYMMDDDatePipe,
    HHMMSS24TO12DatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PadStringPipe,
    YYYYMMDDDatePipe,
    HHMMSS24TO12DatePipe
  ],
  providers: []
})
export class CommonDirectiveModule { }
