import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp, isValidDate } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormDateComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-date',
  templateUrl: './vm-form-date.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-input',
    '[class.input-focus]': 'formGroupInputClass',
    '[class.input-disabled]': 'formGroupInputDisabledClass'
  },
  providers: [INPUT_VALUE_ACCESSOR]
})
export class VMFormDateComponent implements ControlValueAccessor {
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
   * firstDayOfWeek es el valor actuald del dia de inicio de la semana en el calendar
   */
  private _firstDayOfWeek = 1;
  @Input()
  get firstDayOfWeek(): number {
    return this._firstDayOfWeek;
  }
  set firstDayOfWeek(value: number) {
    let newValue = coerceNumberProperty(value, 0);
    if (newValue > 6 || newValue < 0) { newValue = 0; }
    this._firstDayOfWeek = newValue;
  }

  /**
   * @description
   * Label es el placeholder del input.
   */
  private _pickerType = 'calendar';
  @Input()
  get pickerType(): string {
    return this._pickerType;
  }
  set pickerType(value: string) {
    // tslint:disable-next-line:prefer-conditional-expression
    if (this.pickerType === 'both' || this.pickerType === 'calendar' || this.pickerType === 'timer') {
      this._pickerType = value;
    } else {
      this._pickerType = 'calendar';
    }
  }

  /**
   * @description
   * Es la vista del calendario con la que debe inicializar, toma los valores de
   * 'month', 'year', 'multi-years'
   */
  private _startView = 'month';
  @Input()
  get startView(): string {
    return this._startView;
  }
  set startView(value: string) {
    this._startView = (value === 'month' || value === 'year' || value === 'multi-years') ? value : 'month';
  }

  /**
   * @description
   * Es el tipo de seleccion que tiene el input
   * 'single', 'range', 'rangeFrom', 'rangeTo'
   */
  private _selectMode = 'single';
  @Input()
  get selectMode(): string {
    return this._selectMode;
  }
  set selectMode(value: string) {
    this._selectMode = (value === 'single' || value === 'range' || value === 'rangeFrom' || value === 'rangeTo') ? value : 'single';
  }

  /**
   * @description
   * Día mínimo para el calendario
   */
  private _min = null;
  @Input()
  get min(): Date {
    return this._min;
  }
  set min(value: Date) {
    this._min = isValidDate(value) ? value : null;
  }

  /**
   * @description
   * Día máximo para el calendario
   */
  private _max = null;
  @Input()
  get max(): Date {
    return this._max;
  }
  set max(value: Date) {
    this._max = isValidDate(value) ? value : null;
  }

  /**
   * @description
   * Es donde inicia el calendario
   */
  private _startAt = null;
  @Input()
  get startAt(): string {
    return this._startAt;
  }
  set startAt(value: string) {
    this._startAt = isValidDate(value) ? value : null;
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
    return !!this.value;
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
