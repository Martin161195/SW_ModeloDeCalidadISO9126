import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMFormErrorComponent } from './vm-form-error.component';
import { VMFormErrorDirective } from './vm-form-error.directive';

@NgModule({
  declarations: [
    VMFormErrorComponent,
    VMFormErrorDirective
  ],
  imports: [ CommonModule ],
  exports: [
    VMFormErrorComponent
  ],
  providers: []
})
export class VMFormErrorModule {}
