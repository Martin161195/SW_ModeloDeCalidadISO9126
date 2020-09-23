import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormCheckboxComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-checkbox',
  templateUrl: './vm-form-checkbox.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-checkbox'
  },
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class VMFormCheckboxComponent implements ControlValueAccessor {
  /**
   * @description
   * Hold efect blur in checkbox
   */
  counter = 0;

  /**
   * @description
   * Notifica que esta ocurriendo un evento, sea por touched o
   * cambio de valore
   */
  readonly _onChanged: BehaviorSubject<void>;

  /**
   * @description
   * Value es el valor actuald del checkbox nativo
   */
  private _value = false;
  @Input()
  get value(): boolean {
    return this._value;
  }
  set value(value: boolean) {
    // Si el valor de value es null es porque el formulario se reseteo
    if (value === null) { this.counter = 0; }
    if (value === null && this.disabled) { return; }
    if (this.counter === 1) { this.propageTouched(); }
    this._value = value;
    if (!this.disabled) {
      this.counter++;
      this.propagateChange(this._value);
      this._onChanged.next(null);
    }
  }

  /**
   * @description
   * Label es el placeholder del input.
   */
  private _label = '';
  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value || 'text';
  }

  /**
   * @description
   * Input para disabled el input nativo
   */
  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProp(value);
  }

  /**
   * @description
   * Metodo para sostener el cambio en el input nativo
   */
  private propagateChange: any = () => { };

  /**
   * @description
   * Metodo para sostener el evento touched
   */
  private propageTouched: any = () => { };

  _onBlur(): void {
    this.propageTouched();
    this._onChanged.next(null);
  }

  constructor() {
    this._onChanged = new BehaviorSubject<void>(null);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propageTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
