import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMFormSelectComponent } from './vm-form-select.component';

@NgModule({
  declarations: [
    VMFormSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VMFormSelectComponent
  ],
  providers: []
})
export class VMFormSelectModule { }
