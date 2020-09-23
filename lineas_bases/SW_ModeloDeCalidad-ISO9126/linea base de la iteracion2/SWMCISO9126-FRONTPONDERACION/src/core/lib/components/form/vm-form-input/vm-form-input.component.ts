import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormInputComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-input',
  templateUrl: './vm-form-input.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-input',
    '[class.form-input__symbol]': 'haveSymbol',
    '[class.input-focus]': 'formGroupInputClass',
    '[class.input-disabled]': 'formGroupInputDisabledClass'
  },
  providers: [INPUT_VALUE_ACCESSOR]
})
export class VMFormInputComponent implements ControlValueAccessor {

  private _nativeInput: ElementRef;
  @ViewChild('nativeInput', { read: ElementRef, static: false })
  get nativeInput(): ElementRef {
    return this._nativeInput;
  }
  set nativeInput(input: ElementRef) {
    this._nativeInput = input;
  }

  private _haveSymbol = false;
  @Input()
  get haveSymbol(): boolean {
    return this._haveSymbol;
  }
  set haveSymbol(value: boolean) {
    this._haveSymbol = coerceBooleanProp(value);
  }

  /**
   * @description
   * Notifica que esta ocurriendo un evento, sea por touched o
   * cambio de valore
   */
  readonly _onChanged: BehaviorSubject<void>;

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
    if (value === null && (this.disabled && !this.readOnly)) { return; }
    this._value = value;
    if (!this.disabled || !!this.readOnly) {
      this.propagateChange(this._value);
      this._onChanged.next(null);
    }
  }

  /**
   * @description
   * Type Valor, por default es el tipo texto, pero este puede cambiar
   * a 'tel', 'number', 'email'
   */
  private _type = 'text';
  @Input()
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value || 'text';
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
  private _alter = '';
  @Input()
  get alter(): string {
    return this._alter;
  }
  set alter(value: string) {
    this._alter = value || 'text';
  }

  /**
   * @description
   * Input para readOnly el input nativo
   * Esta propiedad se ingresa como Input, y sirve para poder resetear un imput aún asi
   * este se encuentre en modo disabled, ademas que tambien cambia la clase disabled
   */
  private _readOnly = false;
  @Input()
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(value: boolean) {
    this._readOnly = coerceBooleanProp(value);
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
    return typeof this.value === 'string'
      ? !!this.value : (this.value === null ? false : true);
  }

  /**
   * @description
   * Sostiene la clase 'input-disabled' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  get formGroupInputDisabledClass(): boolean {
    return !!this.disabled && !this.readOnly;
  }

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
