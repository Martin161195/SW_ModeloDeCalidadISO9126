
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { VMRippleDirective } from './vm-ripple.directive';

@NgModule({
  imports: [
    PlatformModule
  ],
  exports: [
    VMRippleDirective
  ],
  declarations: [
    VMRippleDirective
  ]
})
export class VMRippleModule { }
