import { ModuleWithProviders, NgModule } from '@angular/core';
import { IVMProgressRouterConfig, VM_PROGRESS_ROUTER_CONFIG } from './vm-progress-router.interface';
import { VMProgressRouter } from './vm-progress-router.service';

@NgModule({})
export class VMProgressRouterModule {

  // Inject the service to activate it
  constructor(ngProgressRouter: VMProgressRouter) { }

  static withConfig(config: IVMProgressRouterConfig): ModuleWithProviders {
    return {
      ngModule: VMProgressRouterModule,
      providers: [
        { provide: VM_PROGRESS_ROUTER_CONFIG, useValue: config }
      ]
    };
  }
}
