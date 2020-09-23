import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '@core/common/helpers';
import { BehaviorSubject } from 'rxjs';

export const SELECTAUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormSelectAutocompleteComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-select-autocomplete',
  templateUrl: './vm-form-select-autocomplete.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-input',
    '[class.input-focus]': 'formGroupSelectClass',
    '[class.input-disabled]': 'formGroupSelectDisabledClass'
  },
  providers: [SELECTAUTOCOMPLETE_VALUE_ACCESSOR]
})
export class VMFormSelectAutocompleteComponent implements ControlValueAccessor {
  /**
   * @description
   * Notifica que esta ocurriendo un evento, sea por touched o
   * cambio de valore
   */
  readonly _onChanged: BehaviorSubject<void>;

  @Output() readonly eClosePicker: EventEmitter<void>;

  @Output() readonly eConfirmSelected: EventEmitter<any>;

  private _listItem: Array<any> = [];
  @Input()
  get options(): Array<any> {
    return this._listItem;
  }
  set options(listItem: Array<any>) {
    this._listItem = Array.isArray(listItem) ? listItem : [];
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
    const oldValue = this._value;
    if ((!this.disabled || !!this.readOnly) && !(oldValue === value)) {
      this._value = value;
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
  private _loading = false;
  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = coerceBooleanProp(value);
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
    this.eClosePicker = new EventEmitter<void>();
    this.eConfirmSelected = new EventEmitter<any>();
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

  handleClosePicker($event: any): void {
    this.eClosePicker.emit();
  }

  handleConfirmSelected($event: any): void {
    this.eConfirmSelected.emit($event);
  }

}
