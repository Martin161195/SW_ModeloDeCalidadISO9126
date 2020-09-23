import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMSpinnerMaterialModule } from '@core/lib/components/loader/spinner-material/vm-spinner-material.module';
import { VMAlertBodyComponent } from './alert-body/vm-alert-body.component';
import { VMAlertFooterComponent } from './alert-footer/vm-alert-footer.component';
import { VMAlertHeaderComponent } from './alert-header/vm-alert-header.component';
import { VMAlertLoaderComponent } from './alert-loader/vm-alert-loader.component';
import { VMAlertComponent } from './alert/vm-alert.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExclamationCircle,
  faGem,
  faMedal,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMAlertComponent,
    VMAlertLoaderComponent,
    VMAlertHeaderComponent,
    VMAlertBodyComponent,
    VMAlertFooterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    VMSpinnerMaterialModule
  ],
  exports: [
    VMAlertComponent,
    VMAlertLoaderComponent,
    VMAlertHeaderComponent,
    VMAlertBodyComponent,
    VMAlertFooterComponent
  ],
  providers: []
})
export class VMAlertModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faExclamationCircle,
      faGem,
      faMedal,
      faTimes
    );
  }
}
