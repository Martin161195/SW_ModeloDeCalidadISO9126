import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  VM_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  VMTooltipComponent,
  VMTooltipDirective
} from './vm-tooltip.component';

@NgModule({
  declarations: [
    VMTooltipDirective,
    VMTooltipComponent
  ],
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule
  ],
  exports: [
    VMTooltipDirective,
    VMTooltipComponent
  ],
  entryComponents: [
    VMTooltipComponent
  ],
  providers: [
    VM_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER
  ]
})
export class VMTooltipModule { }
