import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { VMProgressComponent } from './vm-progress.component';
import { IVMProgressConfig, VM_PROGRESS_CONFIG } from './vm-progress.interface';

@NgModule({
  declarations: [
    VMProgressComponent
  ],
  exports: [
    VMProgressComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VMProgressModule {
  static withConfig(config: IVMProgressConfig): ModuleWithProviders {
    return {
      ngModule: VMProgressModule,
      providers: [
        { provide: VM_PROGRESS_CONFIG, useValue: config }
      ]
    };
  }
}
