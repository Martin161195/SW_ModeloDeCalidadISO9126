import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { SelectListItem } from '../vm-form-select/vm-form-select.component';
import { VMFormAutocompleteComponent } from './vm-form-autocomplete.component';

export const VM_AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => VMFormAutocompleteInputDirective),
  multi: true
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[vmFormAutocomplete]',
  exportAs: 'vmFormAutocompleteInput',
  providers: [
    VM_AUTOCOMPLETE_VALUE_ACCESSOR
  ]
})
export class VMFormAutocompleteInputDirective implements AfterContentInit, ControlValueAccessor, OnDestroy, OnInit {

  /** Emits when the value changes (either due to user input or programmatic change). */
  valueChange: Subject<string>;

  /** Emits when the disabled state has changed */
  disabledChange: Subject<boolean>;

  /** Emits when keyboard event */
  keyboardEvent: Subject<any>;

  /** The autocomlete that this input is associated with. */
  dtAutocomplete: VMFormAutocompleteComponent;
  dtAutocompleteSub: Subscription = Subscription.EMPTY;

  /**
   * Callback to invoke when `change` event is fired on this `<input>`
   */
  @Output() readonly eAutocompleteDirectiveChange = new EventEmitter<any>();

  /**
   * Callback to invoke when an `input` event is fired on this `<input>`.
   */
  @Output() readonly eAutocompleteDirectiveInput = new EventEmitter<any>();

  /**
   * Callback to invoke when an `confirmSelectedChange` event is fired on this `autocomplete` component.
   */
  @Output() readonly eConfirmSelected = new EventEmitter<any>();

  /**
   * The autcomplete form that this input is associated with.
   */
  @Input()
  set vmFormAutocomplete(value: VMFormAutocompleteComponent) {
    this.registerAutocomplete(value);
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
    this._readOnly = coerceBooleanProperty(value);
  }

  /** Whether the date time picker's input is disabled. */
  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    const element = this.elmRef.nativeElement;

    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this.disabledChange.next(newValue);
    }

    // We need to null check the `blur` method, because it's undefined during SSR.
    if (newValue && element.blur) {
      // Normally, native input elements automatically blur if they turn disabled. This behavior
      // is problematic, because it would mean that it triggers another change detection cycle,
      // which then causes a changed after checked error if the input element was focused before.
      element.blur();
    }
  }

  private _value = '';
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    // Si el valor de value es null es porque el formulario se reseteo
    if (value === null && (this.disabled && !this.readOnly)) { return; }
    const oldValue = this._value;

    if ((!this.disabled || !!this.readOnly) && !(oldValue === value)) {
      this._value = value;
      this.valueChange.next(value);
      this.propagateChange(this._value);

      // Se añade esta función para soportar el reseteo del formulario y cuando se selecciona un item
      // por alguna razón no setea el value del input, en el resto de casos si funciona, solo en el resete de formulario no.
      this.formatNativeInputValue();
    }
  }

  @HostBinding('attr.aria-haspopup')
  get vmAutocompleteInputAriaHaspopup(): boolean {
    return true;
  }

  @HostBinding('attr.aria-owns')
  get vmAutocompleteInputAriaOwns(): string {
    return (this.dtAutocomplete.opened && this.dtAutocomplete.id) || null;
  }

  @HostBinding('disabled')
  get vmAutocompleteInputDisabled(): boolean {
    return !!this.disabled;
  }

  @HostListener('input', ['$event']) handleInputOnHost(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.eAutocompleteDirectiveInput.next(value);
  }

  /**
   * Open the picker when user hold alt + DOWN_ARROW
   */
  @HostListener('keydown', ['$event']) handleKeydownOnHost(event: any): void {
    if (event.altKey && event.keyCode === DOWN_ARROW) {
      this.dtAutocomplete.open();
      event.preventDefault();
    } else if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW || event.keyCode === ENTER) {
      this.keyboardEvent.next(event);
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event']) handleBlurOnHost(event: any): void {
    this.propageTouched();
  }

  constructor(
    private readonly elmRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.valueChange = new Subject<string>();
    this.disabledChange = new Subject<boolean>();
    this.keyboardEvent = new Subject<any>();
  }

  ngOnInit(): void {
    if (!this.dtAutocomplete) {
      throw Error(
        `vmFormAutocomplete: the autocomplete input doesn't have any associated vm-form-autocomplete component`);
    }
  }

  ngAfterContentInit(): void {

    this.dtAutocompleteSub = this.dtAutocomplete
      .confirmSelectedChange
      .subscribe((value: SelectListItem) => {
        this.value = value.text;
        this.eConfirmSelected.emit(value.value);
      });
  }

  ngOnDestroy(): void {
    this.dtAutocompleteSub.unsubscribe();
    this.valueChange.complete();
    this.disabledChange.complete();
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

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propageTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private formatNativeInputValue(): void {
    this.renderer.setProperty(
      this.elmRef.nativeElement,
      'value',
      this._value ? this._value : ''
    );
  }

  private registerAutocomplete(autocomplete: VMFormAutocompleteComponent): void {
    if (autocomplete) {
      this.dtAutocomplete = autocomplete;
      this.dtAutocomplete.registerInput(this);
    }
  }

  get elementRef(): ElementRef {
    return this.elmRef;
  }

}
