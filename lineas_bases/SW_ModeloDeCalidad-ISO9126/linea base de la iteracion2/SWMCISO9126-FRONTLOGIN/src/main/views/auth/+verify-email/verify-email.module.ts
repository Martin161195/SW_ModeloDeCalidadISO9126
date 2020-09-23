import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailRoutingModule } from '@main/views/auth/+verify-email/verify-email.routing';

import { VerifyEmailComponent } from '@main/views/auth/+verify-email/verify-email.component';

@NgModule({
  imports: [
    VerifyEmailRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    VerifyEmailComponent
  ],
  providers: []
})
export class VerifyEmailModule { }
