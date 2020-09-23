import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMDropdownComponent } from './vm-dropdown.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMDropdownComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    VMDropdownComponent
  ],
  providers: []
})
export class VMDropdownModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faEllipsisH
    );
  }
}
