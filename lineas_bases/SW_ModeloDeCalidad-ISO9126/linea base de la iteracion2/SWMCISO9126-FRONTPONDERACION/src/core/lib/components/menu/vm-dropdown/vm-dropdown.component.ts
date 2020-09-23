import { Component, Input, OnInit } from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-dropdown',
  templateUrl: './vm-dropdown.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'g-dropdown',
    '[class.g-dropdown--arrow]': 'dropdownArrowClass',
    '[class.g-dropdown--align-right]': 'dropdownAlignRightClass',
    '[class.g-dropdown--align-left]': 'dropdownAlignLeftClass',
    '[class.g-dropdown--align-center]': 'dropdownAlignCenterClass',
    '[class.g-dropdown--align-push]': 'dropdownAlignPushClass',
    '[class.g-dropdown--open]': 'dropdownOpenClass'
  }
})
export class VMDropdownComponent implements OnInit {

  /**
   * @description
   * Sostiene la clase 'g-dropdown--arrow' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _dropdownArrowClass = false;
  @Input()
  get dropdownArrowClass(): boolean {
    return this._dropdownArrowClass;
  }
  set dropdownArrowClass(value: boolean) {
    this._dropdownArrowClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-dropdown--align-right' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _dropdownAlignRightClass = false;
  @Input()
  get dropdownAlignRightClass(): boolean {
    return this._dropdownAlignRightClass;
  }
  set dropdownAlignRightClass(value: boolean) {
    this._dropdownAlignRightClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-dropdown--align-left' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _dropdownAlignLeftClass = false;
  @Input()
  get dropdownAlignLeftClass(): boolean {
    return this._dropdownAlignLeftClass;
  }
  set dropdownAlignLeftClass(value: boolean) {
    this._dropdownAlignLeftClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-dropdown--align-center' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _dropdownAlignCenterClass = false;
  @Input()
  get dropdownAlignCenterClass(): boolean {
    return this._dropdownAlignCenterClass;
  }
  set dropdownAlignCenterClass(value: boolean) {
    this._dropdownAlignCenterClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-dropdown--align-push' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _dropdownAlignPushClass = false;
  @Input()
  get dropdownAlignPushClass(): boolean {
    return this._dropdownAlignPushClass;
  }
  set dropdownAlignPushClass(value: boolean) {
    this._dropdownAlignPushClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-dropdown--open' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _dropdownOpenClass = false;
  @Input()
  get dropdownOpenClass(): boolean {
    return this._dropdownOpenClass;
  }
  set dropdownOpenClass(value: boolean) {
    this._dropdownOpenClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-btn--small' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _btnPillClass = false;
  @Input()
  get btnPillClass(): boolean {
    return this._btnPillClass;
  }
  set btnPillClass(value: boolean) {
    this._btnPillClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-btn--small' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _btnSmallClass = false;
  @Input()
  get btnSmallClass(): boolean {
    return this._btnSmallClass;
  }
  set btnSmallClass(value: boolean) {
    this._btnSmallClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-btn--small' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _btnOnlyText = false;
  @Input()
  get btnOnlyText(): boolean {
    return this._btnOnlyText;
  }
  set btnOnlyText(value: boolean) {
    this._btnOnlyText = coerceBooleanProp(value);
  }

  /**
   * @description
   * Revisa si el button es outline
   */
  private _btnIsOutline = false;
  @Input()
  get btnIsOutline(): boolean {
    return this._btnIsOutline;
  }
  set btnIsOutline(value: boolean) {
    this._btnIsOutline = coerceBooleanProp(value);
  }

  /**
   * @description
   * Revisa si el button es outline
   */
  private _btnTheme = 'default';
  @Input()
  get btnTheme(): string {
    return this._btnTheme;
  }
  set btnTheme(value: string) {
    this._btnTheme = value || 'default';
  }

  /**
   * @description
   * text es el texto del dropdown
   */
  private _isIcon = false;
  @Input()
  get isIcon(): boolean {
    return this._isIcon;
  }
  set isIcon(value: boolean) {
    this._isIcon = coerceBooleanProp(value);
  }

  /**
   * @description
   * text es el texto del dropdown
   */
  private _text = '';
  @Input()
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value || '';
  }

  constructor() { }

  // tslint:disable-next-line:cyclomatic-complexity
  get btnThemeClass(): string {
    let theme: string;
    if (this.btnIsOutline) {
      switch (this.btnTheme) {
        case 'primary':
          theme = 'g-btn--outline-primary';
          break;
        case 'brand':
          theme = 'g-btn--outline-primary';
          break;
        case 'accent':
          theme = 'g-btn--outline-accent';
          break;
        case 'danger':
          theme = 'g-btn--outline-danger';
          break;
        case 'dark':
          theme = 'g-btn--outline-dark';
          break;
        case 'info':
          theme = 'g-btn--outline-info';
          break;
        case 'metal':
          theme = 'g-btn--outline-metal';
          break;
        case 'orange':
          theme = 'g-btn--outline-orange';
          break;
        case 'purple':
          theme = 'g-btn--outline-purple';
          break;
        case 'transparent':
          theme = 'g-btn--outline-transparent';
          break;
        default:
          theme = 'g-btn--secondary';
          break;
      }
    } else {
      switch (this.btnTheme) {
        case 'primary':
          theme = 'g-btn--primary';
          break;
        case 'brand':
          theme = 'g-btn--primary';
          break;
        case 'accent':
          theme = 'g-btn--accent';
          break;
        case 'danger':
          theme = 'g-btn--danger';
          break;
        case 'dark':
          theme = 'g-btn--dark';
          break;
        case 'info':
          theme = 'g-btn--info';
          break;
        case 'metal':
          theme = 'g-btn--metal';
          break;
        case 'orange':
          theme = 'g-btn--orange';
          break;
        case 'purple':
          theme = 'g-btn--purple';
          break;
        case 'transparent':
          theme = 'g-btn--transparent';
          break;
        default:
          theme = 'g-btn--secondary';
          break;
      }
    }

    return `g-btn g-dropdown__toggle ${theme}`;
  }

  ngOnInit(): void { }
}
