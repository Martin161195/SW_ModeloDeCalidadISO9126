import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '@main/layouts/auth/auth-layout.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [],
  declarations: [
    AuthLayoutComponent
  ],
  providers: []
})
export class AuthLayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBars);
  }
}
