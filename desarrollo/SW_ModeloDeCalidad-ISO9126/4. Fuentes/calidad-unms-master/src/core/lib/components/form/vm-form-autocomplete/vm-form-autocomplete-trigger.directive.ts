import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { VMFormAutocompleteComponent } from './vm-form-autocomplete.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[vmFormAutocompleteTrigger]'
})
export class VMFormAutocompleteTriggerDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {

  private stateChanges = Subscription.EMPTY;

  // tslint:disable-next-line:no-input-rename
  @Input('vmFormAutocompleteTrigger') dtPicker: VMFormAutocompleteComponent;

  private _disabled: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  @HostBinding('class.g-autocomplete__trigger-disabled')
  get owlDTTriggerDisabledClass(): boolean {
    return this.disabled;
  }

  @HostListener('click', ['$event']) handleClickOnHost(event: any): void {
    if (this.dtPicker) {
      event.stopPropagation();
      this.dtPicker.open();
    }
  }

  @HostListener('input', ['$event']) handleInputOnHost(event: any): void {
    if (this.dtPicker) {
      event.stopPropagation();
      this.dtPicker.open();
    }
  }

  constructor(protected changeDetector: ChangeDetectorRef) { }

  public ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datepicker) {
      this.watchStateChanges();
    }
  }

  ngAfterContentInit(): void {
    this.watchStateChanges();
  }

  ngOnDestroy(): void {
    this.stateChanges.unsubscribe();
  }

  private watchStateChanges(): void {
    this.stateChanges.unsubscribe();

    const inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
      this.dtPicker.dtInput.disabledChange : observableOf();

    const pickerDisabled = this.dtPicker ?
      this.dtPicker.disabledChange : observableOf();

    this.stateChanges = merge(pickerDisabled, inputDisabled)
      .subscribe(() => {
        this.changeDetector.markForCheck();
      });
  }
}
