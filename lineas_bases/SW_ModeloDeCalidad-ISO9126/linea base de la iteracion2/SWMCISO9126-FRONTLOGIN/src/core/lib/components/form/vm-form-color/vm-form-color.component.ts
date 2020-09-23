import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormColorComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-color',
  templateUrl: './vm-form-color.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-input',
    '[class.input-focus]': 'formGroupInputClass || colorPickerOpen',
    '[class.input-disabled]': 'formGroupInputDisabledClass'
  },
  providers: [INPUT_VALUE_ACCESSOR]
})
export class VMFormColorComponent implements ControlValueAccessor {
  /**
   * @description
   * Notifica que esta ocurriendo un evento, sea por touched o
   * cambio de valore
   */
  readonly _onChanged: BehaviorSubject<void>;

  /**
   * @description
   * Sostiene la clase 'input-focus' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _colorPickerOpen = false;
  get colorPickerOpen(): boolean {
    return this._colorPickerOpen;
  }
  set colorPickerOpen(value: boolean) {
    this._colorPickerOpen = coerceBooleanProp(value);
  }

  /**
   * @description
   * Value es el valor actuald del input nativo
   */
  private _value = '';
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    // Si el valor de value es null es porque el formulario se reseteo
    if (value === null && this.disabled) { return; }
    this._value = value;
    if (!this.disabled) {
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
   * Label es el placeholder del input.
   */
  private _cpPosition = 'right';
  @Input()
  get cpPosition(): string {
    return this._cpPosition;
  }
  set cpPosition(value: string) {
    // tslint:disable-next-line:prefer-conditional-expression
    if (value === 'right' || value === 'left' || value === 'top' || value === 'bottom') {
      this._cpPosition = value;
    } else {
      this._cpPosition = 'right';
    }
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

  /**
   * @description
   * Sostiene la clase 'input-focus' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  get formGroupInputClass(): boolean {
    return !!this.value;
  }

  /**
   * @description
   * Sostiene la clase 'input-disabled' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  get formGroupInputDisabledClass(): boolean {
    return !!this.disabled;
  }

  _onBlur(): void {
    this.propageTouched();
    this._onChanged.next(null);
  }

  _colorPickerOpenEvent(): void {
    this.colorPickerOpen = true;
  }

  _colorPickerCloseEvent(): void {
    this.colorPickerOpen = false;
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
