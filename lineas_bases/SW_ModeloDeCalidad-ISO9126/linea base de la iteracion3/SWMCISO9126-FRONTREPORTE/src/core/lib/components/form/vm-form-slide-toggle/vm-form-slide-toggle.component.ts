import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/* import {
  CanColor, CanColorCtor,
  CanDisable, CanDisableCtor,
  CanDisableRipple, CanDisableRippleCtor,
  HasTabIndex, HasTabIndexCtor,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
  mixinTabIndex,
} from '@angular/material/core'; */
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import {
  IVMFormSlideToggleDefaultOptions,
  VM_FORM_SLIDE_TOGGLE_DEFAULT_OPTIONS
} from './vm-form-slide-toggle.config';

// Increasing integer for generating unique ids for slide-toggle components.
let nextUniqueId = 0;

/** @docs-private */
export const VM_FORM_SLIDE_TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-forward-ref
  useExisting: forwardRef(() => VMFormSlideToggleComponent),
  multi: true
};

/** Change event object emitted by a MatSlideToggle. */
export class VMFormSlideToggleChange {
  constructor(
    /** The source MatSlideToggle of the event. */
    public source: VMFormSlideToggleComponent,
    /** The new `checked` value of the MatSlideToggle. */
    public checked: boolean) { }
}

// Boilerplate for applying mixins to MatSlideToggle.
class VMFormSlideToggleBase {
  constructor(public _elementRef: ElementRef) { }
}

/* const _VMFormSlideToggleMixinBase:
  HasTabIndexCtor &
  CanColorCtor &
  CanDisableRippleCtor &
  CanDisableCtor &
  typeof VMFormSlideToggleBase =
  mixinTabIndex(mixinColor(mixinDisableRipple(mixinDisabled(VMFormSlideToggleBase)), 'accent')); */

/** Represents a slidable "switch" toggle that can be moved between on and off. */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vm-form-slide-toggle',
  exportAs: 'VMFormSlideToggle',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    // tslint:disable-next-line: object-literal-key-quotes
    'class': 'vm-slide-toggle',
    '[id]': 'id',
    // Needs to be `-1` so it can still receive programmatic focus.
    '[attr.tabindex]': 'disabled ? null : -1',
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[class.vm-checked]': 'checked',
    '[class.vm-disabled]': 'disabled',
    '[class.vm-slide-toggle-label-before]': 'labelPosition == "before"',
    '[class._vm-animation-noopable]': '_animationMode === "NoopAnimations"',
    '(focus)': '_inputElement.nativeElement.focus()'
  },
  templateUrl: 'vm-form-slide-toggle.component.html',
  // styleUrls: ['slide-toggle.css'],
  providers: [VM_FORM_SLIDE_TOGGLE_VALUE_ACCESSOR],
  /* inputs: [
    'disabled',
    'disableRipple',
    'color',
    'tabIndex'], */
  // tslint:disable-next-line: use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VMFormSlideToggleComponent extends VMFormSlideToggleBase implements OnDestroy, AfterContentInit, ControlValueAccessor {

  private readonly _uniqueId = `vm-form-slide-toggle-${nextUniqueId += 1}`;

  /** Whether the thumb is currently being dragged. */
  private _dragging = false;

  /** Previous checked state before drag started. */
  private _previousChecked: boolean;

  /** Width of the thumb bar of the slide-toggle. */
  private _thumbBarWidth: number;

  /** Percentage of the thumb while dragging. Percentage as fraction of 100. */
  private _dragPercentage: number;

  /** Reference to the thumb HTMLElement. */
  @ViewChild('thumbContainer', { static: false }) _thumbEl: ElementRef;

  /** Reference to the thumb bar HTMLElement. */
  @ViewChild('toggleBar', { static: false }) _thumbBarEl: ElementRef;

  /** Name value will be applied to the input element if present. */
  @Input() name: string | null = null;

  /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;

  /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
  @Input() labelPosition: 'before' | 'after' = 'after';

  /** Used to set the aria-label attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string | null = null;

  /** Used to set the aria-labelledby attribute on the underlying input element. */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /** Whether the slide-toggle is required. */
  private _tabIndex = 0;
  @Input()
  get tabIndex(): number { return this._tabIndex; }
  set tabIndex(value: number) { this._tabIndex = value; }

  /** Whether the slide-toggle is required. */
  private _required = false;
  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  /** Whether the slide-toggle element is checked or not. */
  private _checked = false;
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value) {
    this._checked = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }

  private _disabled = false;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }

  /** An event will be dispatched each time the slide-toggle changes its value. */
  // tslint:disable-next-line: no-output-native
  @Output() readonly change: EventEmitter<VMFormSlideToggleChange> = new EventEmitter<VMFormSlideToggleChange>();

  /**
   * An event will be dispatched each time the slide-toggle input is toggled.
   * This event is always emitted when the user toggles the slide toggle, but this does not mean
   * the slide toggle's value has changed.
   */
  @Output() readonly toggleChange: EventEmitter<void> = new EventEmitter<void>();

  /**
   * An event will be dispatched each time the slide-toggle is dragged.
   * This event is always emitted when the user drags the slide toggle to make a change greater
   * than 50%. It does not mean the slide toggle's value is changed. The event is not emitted when
   * the user toggles the slide toggle to change its value.
   * @deprecated No longer being used. To be removed.
   * @breaking-change 10.0.0
   */
  @Output() readonly dragChange: EventEmitter<void> = new EventEmitter<void>();

  /** Reference to the underlying input element. */
  @ViewChild('input', { static: false }) _inputElement: ElementRef<HTMLInputElement>;

  /** Returns the unique id for the visual hidden input. */
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(
    protected elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    // tslint:disable-next-line: no-attribute-decorator
    @Attribute('tabindex') tabIndex: string,
    private readonly _ngZone: NgZone,
    @Inject(VM_FORM_SLIDE_TOGGLE_DEFAULT_OPTIONS) public defaults: IVMFormSlideToggleDefaultOptions,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode?: string,
    @Optional() private readonly _dir?: Directionality) {
    super(elementRef);
    /* this.tabIndex = parseInt(tabIndex) || 0; */
  }

  ngAfterContentInit() {
    this._focusMonitor
      .monitor(this._elementRef, true)
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          // When a focused element becomes disabled, the browser *immediately* fires a blur event.
          // Angular does not expect events to be raised during change detection, so any state
          // change (such as a form control's 'ng-touched') will cause a changed-after-checked
          // error. See https://github.com/angular/angular/issues/17793. To work around this,
          // we defer telling the form control it has been touched until the next tick.
          Promise.resolve()
            .then(() => this._onTouched());
        }
      });
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Method being called whenever the underlying input emits a change event. */
  _onChangeEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the component's `change` output.
    event.stopPropagation();

    if (!this._dragging) {
      this.toggleChange.emit();
    }
    // Releasing the pointer over the `<label>` element while dragging triggers another
    // click event on the `<label>` element. This means that the checked state of the underlying
    // input changed unintentionally and needs to be changed back. Or when the slide toggle's config
    // disabled toggle change event by setting `disableToggleValue: true`, the slide toggle's value
    // does not change, and the checked state of the underlying input needs to be changed back.
    if (this._dragging || this.defaults.disableToggleValue) {
      this._inputElement.nativeElement.checked = this.checked;

      return;
    }

    // Sync the value from the underlying input element with the component instance.
    this.checked = this._inputElement.nativeElement.checked;

    // Emit our custom change event only if the underlying input emitted one. This ensures that
    // there is no change event, when the checked state changes programmatically.
    this._emitChangeEvent();
  }

  /** Method being called whenever the slide-toggle has been clicked. */
  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `slide-toggle` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /** Implemented as part of ControlValueAccessor. */
  writeValue(value: any): void {
    this.checked = !!value;
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  /** Focuses the slide-toggle. */
  focus(options?: FocusOptions): void {
    this._focusMonitor.focusVia(this._inputElement, 'keyboard', options);
  }

  /** Toggles the checked state of the slide-toggle. */
  toggle(): void {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }

  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  private _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(new VMFormSlideToggleChange(this, this.checked));
  }

  /** Retrieves the percentage of thumb from the moved distance. Percentage as fraction of 100. */
  private _getDragPercentage(distance: number) {
    let percentage = (distance / this._thumbBarWidth) * 100;

    // When the toggle was initially checked, then we have to start the drag at the end.
    if (this._previousChecked) {
      percentage += 100;
    }

    return Math.max(0, Math.min(percentage, 100));
  }

  _onDragStart() {
    if (!this.disabled && !this._dragging) {
      const thumbEl = this._thumbEl.nativeElement;
      this._thumbBarWidth = this._thumbBarEl.nativeElement.clientWidth - thumbEl.clientWidth;
      thumbEl.classList.add('mat-dragging');

      this._previousChecked = this.checked;
      this._dragging = true;
    }
  }

  _onDrag(event: any) {
    if (this._dragging) {
      const direction = this._dir && this._dir.value === 'rtl' ? -1 : 1;
      this._dragPercentage = this._getDragPercentage(event.deltaX * direction);
      // Calculate the moved distance based on the thumb bar width.
      const dragX = (this._dragPercentage / 100) * this._thumbBarWidth * direction;
      this._thumbEl.nativeElement.style.transform = `translate3d(${dragX}px, 0, 0)`;
    }
  }

  _onDragEnd() {
    if (this._dragging) {
      const newCheckedValue = this._dragPercentage > 50;

      if (newCheckedValue !== this.checked) {
        // tslint:disable-next-line: deprecation
        this.dragChange.emit();
        // tslint:disable-next-line: deprecation
        if (!this.defaults.disableDragValue) {
          this.checked = newCheckedValue;
          this._emitChangeEvent();
        }
      }

      // The drag should be stopped outside of the current event handler, otherwise the
      // click event will be fired before it and will revert the drag change.
      this._ngZone.runOutsideAngular(() => setTimeout(() => {
        if (this._dragging) {
          this._dragging = false;
          this._thumbEl.nativeElement.classList.remove('mat-dragging');

          // Reset the transform because the component will take care
          // of the thumb position after drag.
          this._thumbEl.nativeElement.style.transform = '';
        }
      }));
    }
  }

  /** Method being called whenever the label text changes. */
  _onLabelTextChange() {
    // Since the event of the `cdkObserveContent` directive runs outside of the zone, the
    // slide-toggle component will be only marked for check, but no actual change detection runs
    // automatically. Instead of going back into the zone in order to trigger a change detection
    // which causes *all* components to be checked (if explicitly marked or not using OnPush),
    // we only trigger an explicit change detection for the slide-toggle view and its children.
    this._changeDetectorRef.detectChanges();
  }

  /* static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_checked: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_disableRipple: BooleanInput; */
}
