import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMImagesCurrentComponent } from './vm-images-current.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    VMImagesCurrentComponent
  ],
  declarations: [
    VMImagesCurrentComponent
  ],
  providers: []
})
export class VMImagesCurrentModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTimes
    );
  }
}
