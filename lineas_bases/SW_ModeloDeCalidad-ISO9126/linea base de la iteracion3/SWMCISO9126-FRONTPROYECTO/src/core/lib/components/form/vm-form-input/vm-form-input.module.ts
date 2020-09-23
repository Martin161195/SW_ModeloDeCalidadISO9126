import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMFormInputComponent } from './vm-form-input.component';

@NgModule({
  declarations: [
    VMFormInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VMFormInputComponent
  ],
  providers: []
})
export class VMFormInputModule { }
