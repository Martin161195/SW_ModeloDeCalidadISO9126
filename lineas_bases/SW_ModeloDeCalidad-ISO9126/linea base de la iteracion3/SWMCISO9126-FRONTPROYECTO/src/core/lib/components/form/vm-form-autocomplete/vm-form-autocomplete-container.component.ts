import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
/* import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes'; */
import { switchMap, take, tap } from 'rxjs/operators';
import { VMFormAutocompleteOptionComponent } from './vm-form-autocomplete-option.component';
import { VMAutocompletePickerAnimations } from './vm-form-autocomplete.animation';
import { VMFormAutocompleteComponent } from './vm-form-autocomplete.component';

@Component({
  exportAs: 'vmFormAutocompleteContainer',
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-autocomplete-container',
  templateUrl: './vm-form-autocomplete-container.component.html',
  animations: [
    VMAutocompletePickerAnimations.transformPicker,
    VMAutocompletePickerAnimations.fadeInPicker
  ]
})

export class VMFormAutocompleteContainerComponent implements OnDestroy, OnInit, AfterContentInit, AfterViewInit {
  @ViewChildren(VMFormAutocompleteOptionComponent) listOptionsComponent: QueryList<VMFormAutocompleteOptionComponent>;
  private keyManager: ActiveDescendantKeyManager<VMFormAutocompleteOptionComponent>;
  private subKeyboardInput = Subscription.EMPTY;
  private subOptions = Subscription.EMPTY;
  picker: VMFormAutocompleteComponent;
  activeSelectedIndex = 0; // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
  options: Array<any> = [];

  /**
   * Stream emits when try to hide picker
   */
  private readonly hidePicker$ = new Subject<any>();

  get hidePickerStream(): Observable<any> {
    return this.hidePicker$.asObservable();
  }

  /**
   * Stream emits when try to confirm the selected value
   */
  private readonly confirmSelected$ = new Subject<any>();

  get confirmSelectedStream(): Observable<any> {
    return this.confirmSelected$.asObservable();
  }

  private readonly pickerOpened$ = new Subject<any>();

  get pickerOpenedStream(): Observable<any> {
    return this.pickerOpened$.asObservable();
  }

  get containerElm(): HTMLElement {
    return this.elmRef.nativeElement;
  }

  @HostBinding('class.g-autocomplete__container')
  get vmAutocompleteContainerClass(): boolean {
    return true;
  }

  @HostBinding('class.g-autocomplete__container--popup')
  get vmAutocompletePopupContainerClass(): boolean {
    return true;
  }

  @HostBinding('class.g-autocomplete__container--disabled')
  get owlDTContainerDisabledClass(): boolean {
    return this.picker.disabled;
  }

  @HostBinding('attr.id')
  get owlDTContainerId(): string {
    return this.picker.id;
  }

  @HostBinding('@transformPicker')
  get owlDTContainerAnimation(): any {
    return 'enter';
  }

  @HostListener('@transformPicker.done', ['$event']) handleContainerAnimationDone(event: any): void {
    const toState = event.toState;
    if (toState === 'enter') {
      this.pickerOpened$.next();
    }
  }

  constructor(
    private readonly elmRef: ElementRef,
    private readonly ngZone: NgZone
  ) { }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    this.initPicker();
  }

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.listOptionsComponent)
      .withWrap();

    this.subKeyboardInput = this.picker.dtInput.keyboardEvent
      .subscribe((event: any) => {
        if (event.keyCode === ENTER) {
          if (this.keyManager.activeItem) {
            this.confirmSelected$.next(this.keyManager.activeItem.selectItem());
          }
        } else {
          this.keyManager.onKeydown(event);
        }
      });

    this.subOptions = timer(0)
      .pipe(
        switchMap(() => this.picker.optionsChange),
        tap((res: any) => this.options = res),
        switchMap(() => timer(0))
      )
      .subscribe(() => {
        this.picker.popupRef.updatePosition();
      });
  }

  ngOnDestroy(): void {
    if (!!this.subKeyboardInput) { this.subKeyboardInput.unsubscribe(); }
    if (!!this.subOptions) { this.subOptions.unsubscribe(); }
  }

  handleSelectItem(value: any): void {
    this.confirmSelected$.next(value);
  }

  trackByFn(index, item): any {
    return index;
  }

  private initPicker(): void { }

  /**
   * Focus to the picker
   */
  private focusPicker(): void {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.onStable.asObservable()
        .pipe(take(1))
        .subscribe(() => {
          this.elmRef.nativeElement.focus();
        });
    });
  }
}
