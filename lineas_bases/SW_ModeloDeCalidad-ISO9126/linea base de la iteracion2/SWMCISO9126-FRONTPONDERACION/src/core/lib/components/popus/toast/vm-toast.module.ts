import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { VMToastComponent } from './vm-toast.component';
import { IVMToastConfig, TOAST_CONFIG_TOKEN } from './vm-toast.config';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    FontAwesomeModule
  ],
  declarations: [
    VMToastComponent
  ],
  entryComponents: [
    VMToastComponent
  ]
})
export class VMToastModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCheckCircle,
      faExclamationTriangle,
      faInfoCircle,
      faTimes
    );
  }

  public static forRoot(config?: IVMToastConfig): ModuleWithProviders {
    return {
      ngModule: VMToastModule,
      providers: [
        {
          provide: TOAST_CONFIG_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
