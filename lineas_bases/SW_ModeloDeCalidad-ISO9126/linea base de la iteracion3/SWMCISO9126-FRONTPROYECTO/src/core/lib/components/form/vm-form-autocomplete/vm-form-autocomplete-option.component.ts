import { Highlightable } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { SelectListItem } from '../vm-form-select/vm-form-select.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-autocomplete-option',
  templateUrl: './vm-form-autocomplete-option.component.html'
})
export class VMFormAutocompleteOptionComponent implements Highlightable, OnInit {
  @Output() readonly eSelectItem: EventEmitter<any>;
  private _option: SelectListItem = { text: '', value: '' };
  @Input()
  get option(): SelectListItem {
    return this._option;
  }
  set option(value: SelectListItem) {
    this._option = value ? value : { text: '', value: '' };
  }

  @HostBinding('class.g-autocomplete__option')
  get vmAutocompleteOptionClass(): boolean {
    return true;
  }

  private _isActive = false;
  @HostBinding('class.g-autocomplete__option-hover')
  get vmAutocompleteOptionHoverClass(): boolean {
    return this._isActive;
  }

  @HostListener('click', ['$event']) handleClickOnHost(event: any): void {
    this.eSelectItem.next(this.selectItem());
    event.stopPropagation();
  }

  constructor() {
    this.eSelectItem = new EventEmitter<any>();
  }

  ngOnInit(): void { }

  setActiveStyles(): void {
    this._isActive = true;
  }

  setInactiveStyles(): void {
    this._isActive = false;
  }

  selectItem(): any {
    return this.option;
  }
}
