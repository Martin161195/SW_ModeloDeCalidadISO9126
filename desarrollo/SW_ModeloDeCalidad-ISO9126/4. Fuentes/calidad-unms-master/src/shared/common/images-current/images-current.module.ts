import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImagesCurrentComponent } from './images-current.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ImagesCurrentComponent
  ],
  declarations: [
    ImagesCurrentComponent
  ],
  providers: []
})
export class ImagesCurrentModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTimes
    );
  }
}
