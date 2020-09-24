import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VMFormAutocompleteContainerComponent } from './vm-form-autocomplete-container.component';
import { VMFormAutocompleteInputDirective } from './vm-form-autocomplete-input.directive';
import { VMFormAutocompleteOptionComponent } from './vm-form-autocomplete-option.component';
import { VMFormAutocompleteTriggerDirective } from './vm-form-autocomplete-trigger.directive';
import { VM_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER, VMFormAutocompleteComponent } from './vm-form-autocomplete.component';

@NgModule({
  declarations: [
    VMFormAutocompleteComponent,
    VMFormAutocompleteContainerComponent,
    VMFormAutocompleteInputDirective,
    VMFormAutocompleteTriggerDirective,
    VMFormAutocompleteOptionComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    A11yModule
  ],
  exports: [
    VMFormAutocompleteComponent,
    VMFormAutocompleteContainerComponent,
    VMFormAutocompleteInputDirective,
    VMFormAutocompleteTriggerDirective
  ],
  providers: [
    VM_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER
  ],
  entryComponents: [
    VMFormAutocompleteContainerComponent
  ]
})
export class VMFormAutocompleteModule { }
