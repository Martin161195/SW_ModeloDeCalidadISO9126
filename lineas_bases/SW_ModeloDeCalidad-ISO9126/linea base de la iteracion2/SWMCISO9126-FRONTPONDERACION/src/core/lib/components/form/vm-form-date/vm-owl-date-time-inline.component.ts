import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp, isValidDate } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMOwlDateTimeInlineComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-owl-date-time-inline',
  templateUrl: './vm-owl-date-time-inline.component.html',
  providers: [INPUT_VALUE_ACCESSOR]
})
export class VMOwlDateTimeInlineComponent implements ControlValueAccessor {
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
    if (value === null && this.disabled) { return; }
    this._value = value;
    if (!this.disabled) {
      this.propagateChange(this._value);
      this._onChanged.next(null);
    }
  }

  /**
   * @description
   * Value es el valor actuald del input nativo
   */
  private _firstDayOfWeek = 0;
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
