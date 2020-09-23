import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMTableWrapperDirective } from './vm-table-content.directive';
import { VMTableComponent } from './vm-table.component';

import { VMChipModule } from '@core/lib/components/chip/vm-chip.module';
import { VMTooltipModule } from '@core/lib/components/popus/tooltip/vm-tooltip.module';
import { SimplebarModule } from '@core/lib/directives/simplebar/simplebar.module';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHistory,
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';

import {
  faCalendarAlt,
  faEdit,
  faEye,
  faTrashAlt
} from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    VMTableComponent,
    VMTableWrapperDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SimplebarModule,
    VMChipModule,
    VMTooltipModule
  ],
  exports: [
    VMTableComponent,
    VMTableWrapperDirective
  ],
  providers: []
})
export class VMtableModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCalendarAlt,
      faEdit,
      faEye,
      faSort,
      faSortDown,
      faSortUp,
      faTrashAlt,
      faHistory
    );
  }
}
