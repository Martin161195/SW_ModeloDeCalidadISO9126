import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import {
  BlockScrollStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { VMFormAutocompleteContainerComponent } from './vm-form-autocomplete-container.component';
import { VMFormAutocompleteInputDirective } from './vm-form-autocomplete-input.directive';

/** Injection token that determines the scroll handling while the autocomplete is open. */
export const VM_AUTOCOMPLETE_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('vm-form-autocomplete-scroll-strategy');

/** @docs-private */
export const VM_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY = (overlay: Overlay): () => BlockScrollStrategy => {
  return () => overlay.scrollStrategies.block();
};

/** @docs-private */
export const VM_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER = {
  provide: VM_AUTOCOMPLETE_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: VM_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY
};

let nextUniqueId = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-autocomplete',
  exportAs: 'vmFormAutocomplete',
  templateUrl: './vm-form-autocomplete.component.html'
})

export class VMFormAutocompleteComponent implements OnInit, OnDestroy {

  private readonly _id: string;
  get id(): string {
    return this._id;
  }

  /** Custom class for the picker backdrop. */
  @Input() backdropClass: string | Array<string> = [];

  /** Custom class for the picker overlay pane. */
  @Input() panelClass: string | Array<string> = [];

  private _options: Array<any> = [];
  @Input()
  get options(): Array<any> {
    return this._options;
  }
  set options(options: Array<any>) {
    this._options = Array.isArray(options) ? options : [];
    this.optionsChange.next(this._options);
    /* this.verifyGroup(); */
  }

  /** Whether the autocomplete should be disabled. */
  private _disabled: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this._dtInput ?
      this._dtInput.disabled : !!this._disabled;
  }

  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this.disabledChange.next(newValue);
    }
  }

  /** Whether the autocomplete is open. */
  private _opened = false;
  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(val: boolean) {
    val ? this.open() : this.close();
  }

  /**
   * The scroll strategy when the autocomplete is open
   * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
   */
  @Input() scrollStrategy: ScrollStrategy;

  /**
   * Callback when the autocomplete is closed
   */
  @Output() readonly afterAutocompleteClosed = new EventEmitter<any>();

  /**
   * Callback when the autocomplete is open
   */
  @Output() readonly afterAutocompleteOpen = new EventEmitter<any>();

  /**
   * Callback when the picker is closed
   */
  @Output() readonly afterPickerClosed = new EventEmitter<any>();

  /**
   * Callback when the picker is open
   */
  @Output() readonly afterPickerOpen = new EventEmitter<any>();

  /**
   * Emit when the selected value has been confirmed
   */
  confirmSelectedChange = new EventEmitter<any>();

  /**
   * Emit when the options changed
   */
  optionsChange = new BehaviorSubject<any>([]);

  /**
   * Emits when the autocomplete is disabled.
   */
  disabledChange = new EventEmitter<boolean>();

  // Referencia overlay
  popupRef: OverlayRef;

  private pickerContainerPortal: ComponentPortal<VMFormAutocompleteContainerComponent>;
  private pickerContainer: VMFormAutocompleteContainerComponent;
  private dtInputSub = Subscription.EMPTY;
  private hidePickerStreamSub = Subscription.EMPTY;
  private confirmSelectedStreamSub = Subscription.EMPTY;
  private pickerOpenedStreamSub = Subscription.EMPTY;

  /** The element that was focused before the autocomplete picker was opened. */
  private focusedElementBeforeOpen: HTMLElement | null = null;

  private _dtInput: VMFormAutocompleteInputDirective;
  get dtInput(): VMFormAutocompleteInputDirective {
    return this._dtInput;
  }

  private _selected: any;
  get selected(): any {
    return this._selected;
  }
  set selected(value: any) {
    this._selected = value;
  }

  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
    @Inject(VM_AUTOCOMPLETE_SCROLL_STRATEGY) private readonly defaultScrollStrategy: () => ScrollStrategy,
    @Optional() @Inject(DOCUMENT) private readonly document: any
  ) {
    this._id = `vm-dt-autocomplete-${nextUniqueId++}`;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.close();
    this.dtInputSub.unsubscribe();
    this.disabledChange.complete();

    if (this.popupRef) {
      this.popupRef.dispose();
    }
  }

  registerInput(input: VMFormAutocompleteInputDirective): void {
    if (this._dtInput) {
      throw Error('A VM Autocomplete can only be associated with a single input.');
    }

    this._dtInput = input;
    this.dtInputSub = this._dtInput
      .valueChange.subscribe((value: string) => {
        this.selected = value;
      });
  }

  open(): void {
    if (this._opened || this.disabled) {
      return;
    }

    if (!this._dtInput) {
      throw Error('Attempted to open an VMFormAutocomplete with no associated input.');
    }

    if (this.document) {
      this.focusedElementBeforeOpen = this.document.activeElement;
    }

    // reset the picker selected value
    this.selected = this._dtInput.value;

    this.openAsPopup();

    this.pickerContainer.picker = this;

    // Listen to picker container's hidePickerStream
    this.hidePickerStreamSub = this.pickerContainer
      .hidePickerStream
      .subscribe(() => {
        this.close();
      });

    // Listen to picker container's confirmSelectedStream
    this.confirmSelectedStreamSub = this.pickerContainer
      .confirmSelectedStream
      .subscribe((event: any) => {
        this.select(event);
      });
  }

  /**
   * Selects the given date
   */
  select(value: any): void {
    this.selected = value;
    this.confirmSelect();
  }

  /**
   * Hide the picker
   */
  close(): void {
    if (!this._opened) {
      return;
    }

    if (this.popupRef && this.popupRef.hasAttached()) {
      this.popupRef.detach();
    }

    if (this.pickerContainerPortal && this.pickerContainerPortal.isAttached) {
      this.pickerContainerPortal.detach();
    }

    if (this.hidePickerStreamSub) {
      this.hidePickerStreamSub.unsubscribe();
      this.hidePickerStreamSub = null;
    }

    if (this.confirmSelectedStreamSub) {
      this.confirmSelectedStreamSub.unsubscribe();
      this.confirmSelectedStreamSub = null;
    }

    if (this.pickerOpenedStreamSub) {
      this.pickerOpenedStreamSub.unsubscribe();
      this.pickerOpenedStreamSub = null;
    }

    const completeClose = () => {
      if (this._opened) {
        this._opened = false;
        this.afterPickerClosed.emit(null);
        this.focusedElementBeforeOpen = null;
      }
    };

    if (this.focusedElementBeforeOpen &&
      typeof this.focusedElementBeforeOpen.focus === 'function') {
      // Because IE moves focus asynchronously, we can't count on it being restored before we've
      // marked the datepicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the datepicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the datepicker as closed, async as well.
      this.focusedElementBeforeOpen.focus();
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }

  /**
   * Confirm the selected value
   */
  confirmSelect(event?: any): void {
    const selected = this.selected;
    this.confirmSelectedChange.emit(selected);
    this.close();
  }

  /**
   * Open the picker as popup
   */
  private openAsPopup(): void {
    if (!this.pickerContainerPortal) {
      this.pickerContainerPortal = new ComponentPortal<VMFormAutocompleteContainerComponent>(
        VMFormAutocompleteContainerComponent,
        this.viewContainerRef
      );
    }

    if (!this.popupRef) {
      this.createPopup();
    }

    if (!this.popupRef.hasAttached()) {
      const componentRef: ComponentRef<VMFormAutocompleteContainerComponent> =
        this.popupRef.attach(this.pickerContainerPortal);
      this.pickerContainer = componentRef.instance;

      // Update the position once the calendar has rendered.
      /* this.ngZone.onStable.asObservable()
        .pipe(take(1))
        .subscribe(() => {
          this.popupRef.updatePosition();
        }); */

      // emit open stream
      this.pickerOpenedStreamSub =
        this.pickerContainer
          .pickerOpenedStream
          .pipe(take(1))
          .subscribe(() => {
            this.afterPickerOpen.emit(null);
            this._opened = true;
          });
    }
  }

  private createPopup(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this.createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: ['cdk-overlay-transparent-backdrop', ...coerceArray(this.backdropClass)],
      scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
      panelClass: ['vm-dt-popup', ...coerceArray(this.panelClass)],
      width: this.getHostWidth()
    });

    this.popupRef = this.overlay.create(overlayConfig);

    merge(
      this.popupRef.backdropClick(),
      this.popupRef.detachments(),
      this.popupRef.keydownEvents()
        .pipe(
          filter((event: any) => event.keyCode === ESCAPE || (this._dtInput && event.altKey && event.keyCode === UP_ARROW)))
    )
      .subscribe(() => this.close());
  }

  /**
   * Create the popup PositionStrategy.
   */
  private createPopupPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this._dtInput.elementRef)
      .withTransformOriginOn('.g-autocomplete__container')
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 0 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 0, offsetY: -10 }
      ]);
  }

  private getHostWidth(): number {
    return this._dtInput.elementRef.nativeElement.getBoundingClientRect().width;
  }

}
