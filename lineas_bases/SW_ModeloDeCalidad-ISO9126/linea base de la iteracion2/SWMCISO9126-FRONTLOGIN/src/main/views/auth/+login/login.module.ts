import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from '@main/views/auth/+login/login.routing';

import { LoginComponent } from '@main/views/auth/+login/login.component';

import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
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
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { }
