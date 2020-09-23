import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-card',
  templateUrl: './vm-card.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'g-card',
    '[class.g-card--rounded]': 'cardRoundedClass',
    '[class.g-card--space]': 'cardSpaceClass',
    '[class.g-card--bordered-semi]': 'cardBorderedSemiClass'
  }
})
export class VMCardComponent implements OnInit {

  private _loading = false;
  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = coerceBooleanProperty(value) ;
  }

  /**
   * @description
   * Sostiene la clase 'g-card--rounded' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _cardRoundedClass = true;
  @Input()
  get cardRoundedClass(): boolean {
    return this._cardRoundedClass;
  }
  set cardRoundedClass(value: boolean) {
    this._cardRoundedClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-card--space' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _cardSpaceClass = false;
  @Input()
  get cardSpaceClass(): boolean {
    return this._cardSpaceClass;
  }
  set cardSpaceClass(value: boolean) {
    this._cardSpaceClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-card--bordered-semi' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _cardBorderedSemiClass = false;
  @Input()
  get cardBorderedSemiClass(): boolean {
    return this._cardBorderedSemiClass;
  }
  set cardBorderedSemiClass(value: boolean) {
    this._cardBorderedSemiClass = coerceBooleanProp(value);
  }

  constructor() { }

  ngOnInit(): void { }

}
