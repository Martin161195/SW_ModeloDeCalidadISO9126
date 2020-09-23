import {
  Directive,
  forwardRef,
  Provider
} from '@angular/core';
import {
  CheckboxRequiredValidator,
  NG_VALIDATORS
} from '@angular/forms';

export const VM_FORM_SLIDE_TOGGLE_REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-forward-ref
  useExisting: forwardRef(() => VMFormSlideToggleRequiredValidator),
  multi: true
};

/**
 * Validator for Material slide-toggle components with the required attribute in a
 * template-driven form. The default validator for required form controls asserts
 * that the control value is not undefined but that is not appropriate for a slide-toggle
 * where the value is always defined.
 *
 * Required slide-toggle form controls are valid when checked.
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: `vm-form-slide-toggle[required][formControlName],
             vm-form-slide-toggle[required][formControl], vm-form-slide-toggle[required][ngModel]`,
  providers: [VM_FORM_SLIDE_TOGGLE_REQUIRED_VALIDATOR]
})
// tslint:disable-next-line: directive-class-suffix
export class VMFormSlideToggleRequiredValidator extends CheckboxRequiredValidator { }
