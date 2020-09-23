import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VMPaginationComponent } from './vm-pagination.component';

import { ReactiveFormsModule } from '@angular/forms';
import { VMFormSelectModule } from '@core/lib/components/form/vm-form-select/vm-form-select.module';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMPaginationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    VMFormSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    VMPaginationComponent
  ],
  providers: []
})
export class VMPaginationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faAngleDoubleRight,
      faAngleRight,
      faAngleDoubleLeft,
      faAngleLeft,
      faEllipsisH
    );
  }
}
