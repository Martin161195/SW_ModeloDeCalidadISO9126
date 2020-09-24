import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMFormTextareaComponent } from './vm-form-textarea.component';

@NgModule({
  declarations: [
    VMFormTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    VMFormTextareaComponent
  ],
  providers: []
})
export class VMFormTextareaModule { }
