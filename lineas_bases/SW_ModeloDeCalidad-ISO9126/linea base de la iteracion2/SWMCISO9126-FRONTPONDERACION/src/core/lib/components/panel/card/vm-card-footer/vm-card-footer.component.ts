import { Component, Input, OnInit } from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-card-footer',
  templateUrl: './vm-card-footer.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'g-card__footer',
    '[class.g-card__footer--fit]': 'cardFitClass'
  }
})
export class VMCardFooterComponent implements OnInit {

  /**
   * @description
   * Sostiene la clase 'g-card__footer--fit' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _cardFitClass = false;
  @Input()
  get cardFitClass(): boolean {
    return this._cardFitClass;
  }
  set cardFitClass(value: boolean) {
    this._cardFitClass = coerceBooleanProp(value);
  }

  constructor() { }

  ngOnInit(): void { }
}
