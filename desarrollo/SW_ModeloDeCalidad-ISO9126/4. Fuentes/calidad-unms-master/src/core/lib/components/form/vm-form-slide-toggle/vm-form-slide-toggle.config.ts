import { InjectionToken } from '@angular/core';

/** Default `vm-slide-toggle` options that can be overridden. */
export interface IVMFormSlideToggleDefaultOptions {
  /** Whether toggle action triggers value changes in slide toggle. */
  disableToggleValue?: boolean;
  /**
   * Whether drag action triggers value changes in slide toggle.
   * @deprecated No longer being used.
   * @breaking-change 10.0.0
   */
  disableDragValue?: boolean;
}

/** Injection token to be used to override the default options for `vm-slide-toggle`. */
export const VM_FORM_SLIDE_TOGGLE_DEFAULT_OPTIONS =
  new InjectionToken<IVMFormSlideToggleDefaultOptions>('vm-form-slide-toggle-default-options', {
    providedIn: 'root',
    factory: () => ({ disableToggleValue: false })
  });
