import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VMBreadcrumbConfig } from './service/vm-breadcrumb.config';
import { VMBreadcrumbService } from './service/vm-breadcrumb.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  exports: []
})
export class VMBreadcrumbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VMBreadcrumbModule,
      providers: [
        VMBreadcrumbService,
        VMBreadcrumbConfig
      ]
    };
  }
}
