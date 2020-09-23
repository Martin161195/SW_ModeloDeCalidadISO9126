import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMChipListComponent } from './chip-list/vm-chip-list.component';
import { VMChipComponent } from './chip/vm-chip.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMChipListComponent,
    VMChipComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    VMChipListComponent,
    VMChipComponent
  ],
  providers: []
})
export class VMChipModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTimes,
      faTimesCircle
    );
  }
}
