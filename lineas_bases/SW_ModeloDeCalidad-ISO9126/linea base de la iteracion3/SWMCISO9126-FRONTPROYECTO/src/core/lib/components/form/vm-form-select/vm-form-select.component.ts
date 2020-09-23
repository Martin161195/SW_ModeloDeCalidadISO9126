import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp, isFunction } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormSelectComponent),
  multi: true
};
export type CompareWithFn = (a: any, b: any) => boolean;

export class SelectListItem {
  text: string;
  value: any;
  buffText?: string;
  selected?: boolean;
  disabled?: boolean;

  group?: SelectListGroup;

  constructor(item?: any) {
    if (item.text) { this.text = item.text; }
    if (item.buffText) { this.buffText = item.buffText; }
    if (item.value) { this.value = item.value; }
    if (item.group) { this.group = item.group; }
    this.selected = !!item.selected;
    this.disabled = !!item.disabled;
  }
}

export class SelectListGroup {
  text: string;
  disabled = false;

  constructor(text: string, disabled: boolean = false) {
    this.text = text;
    this.disabled = disabled;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-select',
  templateUrl: './vm-form-select.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-select',
    '[class.select-focus]': 'formGroupSelectClass',
    '[class.select-disabled]': 'formGroupSelectDisabledClass'
  },
  providers: [SELECT_VALUE_ACCESSOR]
})
export class VMFormSelectComponent implements ControlValueAccessor {
  /**
   * @description
   * Notifica que esta ocurriendo un evento, sea por touched o
   * cambio de valore
   */
  readonly _onChanged: BehaviorSubject<void>;

  private _listItem: Array<SelectListItem>;
  @Input()
  get options(): Array<SelectListItem> {
    return this._listItem;
  }
  set options(listItem: Array<SelectListItem>) {
    this._listItem = listItem;
    /* this.verifyGroup(); */
  }

  /**
   * @description
   * Value es el valor actuald del select nativo
   */
  private _value = '';
  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
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
   * Funcion requerida para que compare y seleccione la option
   */
  private _compareWith = (a: any, b: any) => (a === b);
  @Input()
  get compareWith(): CompareWithFn {
    return this._compareWith;
  }
  set compareWith(fn: CompareWithFn) {
    if (!isFunction(fn)) {
      throw Error('`compareWith` must be a function.');
    }
    this._compareWith = fn;
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
  get formGroupSelectClass(): boolean {
    return !!this.value;
  }

  /**
   * @description
   * Sostiene la clase 'input-disabled' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  get formGroupSelectDisabledClass(): boolean {
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

  trackByFn(index, item): any {
    return index;
  }

}
