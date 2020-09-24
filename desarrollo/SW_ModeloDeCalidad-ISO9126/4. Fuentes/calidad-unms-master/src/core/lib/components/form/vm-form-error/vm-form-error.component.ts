import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-error',
  templateUrl: './vm-form-error.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'text-error'
  }
})
export class VMFormErrorComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() readonly onError: EventEmitter<boolean>;

  /**
   * @description
   * Abstractcontrol | FormControl de quien mostrara el error
   */
  private _control: AbstractControl | FormControl;
  @Input()
  get control(): AbstractControl | FormControl {
    return this._control;
  }
  set control(value: AbstractControl | FormControl) {
    if (typeof value === 'object') {
      this._control = value;
    }
  }

  constructor() {
    this.onError = new EventEmitter<boolean>();
  }

  ngOnInit(): void { }

}
