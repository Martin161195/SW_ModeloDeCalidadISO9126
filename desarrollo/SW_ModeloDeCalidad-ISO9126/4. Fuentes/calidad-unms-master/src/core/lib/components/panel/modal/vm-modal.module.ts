import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMSpinnerMaterialModule } from '@core/lib/components/loader/spinner-material/vm-spinner-material.module';
import { VMModalBodyComponent } from './modal-body/vm-modal-body.component';
import { VMModalFooterComponent } from './modal-footer/vm-modal-footer.component';
import { VMModalHeaderComponent } from './modal-header/vm-modal-header.component';
import { VMModalLoaderComponent } from './modal-loader/vm-modal-loader.component';
import { VMModalComponent } from './modal/vm-modal.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTimes
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMModalComponent,
    VMModalLoaderComponent,
    VMModalHeaderComponent,
    VMModalBodyComponent,
    VMModalFooterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    VMSpinnerMaterialModule
  ],
  exports: [
    VMModalComponent,
    VMModalLoaderComponent,
    VMModalHeaderComponent,
    VMModalBodyComponent,
    VMModalFooterComponent
  ],
  providers: []
})
export class VMModalModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTimes
    );
  }
}
