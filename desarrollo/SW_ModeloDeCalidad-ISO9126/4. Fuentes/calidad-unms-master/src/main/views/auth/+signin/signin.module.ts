import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninRoutingModule } from '@main/views/auth/+signin/signin.routing';

import { SigninComponent } from '@main/views/auth/+signin/signin.component';

import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMFormCheckboxModule } from '@core/lib/components/form/vm-form-checkbox/vm-form-checkbox.module';
import { VMFormErrorModule } from '@core/lib/components/form/vm-form-error/vm-form-error.module';
import { VMFormGroupModule } from '@core/lib/components/form/vm-form-group/vm-form-group.module';
import { VMFormInputModule } from '@core/lib/components/form/vm-form-input/vm-form-input.module';

@NgModule({
  imports: [
    CommonModule,
    VMButtonModule,
    VMFormErrorModule,
    VMFormGroupModule,
    VMFormInputModule,
    VMFormCheckboxModule,
    SigninRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    SigninComponent
  ],
  providers: []
})
export class SigninModule { }
