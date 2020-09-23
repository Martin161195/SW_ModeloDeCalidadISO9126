import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { VMFormColorComponent } from './vm-form-color.component';

@NgModule({
  declarations: [
    VMFormColorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule
  ],
  exports: [
    VMFormColorComponent
  ]
})
export class VMFormColorModule { }
