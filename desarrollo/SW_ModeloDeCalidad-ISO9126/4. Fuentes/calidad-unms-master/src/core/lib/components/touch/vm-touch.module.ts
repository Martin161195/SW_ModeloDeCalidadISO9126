import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMTouchListComponent } from './touch-list/vm-touch-list.component';
import { VMTouchComponent } from './touch/vm-touch.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMTouchListComponent,
    VMTouchComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    VMTouchListComponent,
    VMTouchComponent
  ],
  providers: []
})
export class VMTouchModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTimes,
      faTimesCircle
    );
  }
}
