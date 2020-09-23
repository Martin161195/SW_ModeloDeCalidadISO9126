import { ObserversModule } from '@angular/cdk/observers';
import { NgModule } from '@angular/core';
import { VMRippleModule } from '../../cross/ripple/vm-ripple.module';
import { VMFormSlideToggleRequiredValidator } from './vm-form-slide-toggle-required.validator';
import { VMFormSlideToggleComponent } from './vm-form-slide-toggle.component';

/** This module is used by both original and MDC-based s,lide-toggle implementations. */
@NgModule({
  exports: [VMFormSlideToggleRequiredValidator],
  declarations: [VMFormSlideToggleRequiredValidator]
})
// tslint:disable-next-line:class-name
export class _VMFormSlideToggleRequiredValidatorModule {
}

@NgModule({
  imports: [
    _VMFormSlideToggleRequiredValidatorModule,
    VMRippleModule,
    ObserversModule
  ],
  exports: [
    _VMFormSlideToggleRequiredValidatorModule,
    VMFormSlideToggleComponent
  ],
  declarations: [
    VMFormSlideToggleComponent
  ]
})
export class VMFormSlideToggleModule { }
