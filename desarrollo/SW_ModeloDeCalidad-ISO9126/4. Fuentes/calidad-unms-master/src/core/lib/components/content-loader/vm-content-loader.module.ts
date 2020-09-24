import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { VMContentLoaderComponent } from './vm-content-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VMContentLoaderComponent
  ],
  exports: [
    VMContentLoaderComponent
  ]
})
export class VMContentLoaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VMContentLoaderModule
    };
  }
}
