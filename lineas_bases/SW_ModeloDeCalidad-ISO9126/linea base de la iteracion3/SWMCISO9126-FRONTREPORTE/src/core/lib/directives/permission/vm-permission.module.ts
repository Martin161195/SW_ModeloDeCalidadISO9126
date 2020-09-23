import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VMPermissionPlanDirective } from './vm-permission-plan.directive';

@NgModule({
  declarations: [
    VMPermissionPlanDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VMPermissionPlanDirective
  ],
  providers: []
})
export class VMPermissionModule { }
