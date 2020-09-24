import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMFormCheckboxComponent } from './vm-form-checkbox.component';

@NgModule({
  declarations: [
    VMFormCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VMFormCheckboxComponent
  ],
  providers: []
})
export class VMFormCheckboxModule { }
