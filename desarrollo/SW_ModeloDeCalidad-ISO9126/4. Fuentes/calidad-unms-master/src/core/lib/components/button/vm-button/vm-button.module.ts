import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMButtonComponent } from './vm-button.component';
import { VMButtonDirective } from './vm-button.directive';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faBars,
  faCalendarPlus,
  faCartPlus,
  faCheck,
  faCloudUploadAlt,
  faFileUpload,
  faHourglassHalf,
  faPlus,
  faSave,
  faSearch,
  faTrashAlt,
  faUpload,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMButtonComponent,
    VMButtonDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    VMButtonComponent,
    VMButtonDirective
  ],
  providers: []
})
export class VMButtonModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faArrowRight,
      faBars,
      faCalendarPlus,
      faCartPlus,
      faCheck,
      faCloudUploadAlt,
      faFileUpload,
      faHourglassHalf,
      faPlus,
      faSave,
      faSearch,
      faTrashAlt,
      faUpload,
      faUser,
      faUserPlus
    );
  }
}
