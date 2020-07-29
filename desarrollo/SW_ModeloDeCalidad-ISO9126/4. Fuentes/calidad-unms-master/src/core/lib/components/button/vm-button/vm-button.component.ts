import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-button',
  templateUrl: './vm-button.component.html'
})
export class VMButtonComponent implements OnInit {

  @Output() readonly eventClick = new EventEmitter<void>();

  /**
   * @description
   * Sostiene la clase 'g-btn--pill' como una variacion
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
   * Sostiene la clase 'g-btn--pill' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _type = 'button';
  @Input()
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }

  /**
   * @description
   * Sostiene la clase 'g-btn--icon' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _btnIconClass = false;
  @Input()
  get btnIconClass(): boolean {
    return this._btnIconClass;
  }
  set btnIconClass(value: boolean) {
    this._btnIconClass = coerceBooleanProp(value);
  }

  /**
   * @description
   * Sostiene la clase 'g-btn--fullwidth' como una variacion
   * del HostBinding, ya que no es aceptable en Angular Universal
   */
  private _btnFullWidthClass = false;
  @Input()
  get btnFullWidthClass(): boolean {
    return this._btnFullWidthClass;
  }
  set btnFullWidthClass(value: boolean) {
    this._btnFullWidthClass = coerceBooleanProp(value);
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
   * Revisa si el button es disabled y añade la clase 'g-btn--disabled
   */
  private _btnIsDisabled = false;
  @Input()
  get btnIsDisabled(): boolean {
    return this._btnIsDisabled;
  }
  set btnIsDisabled(value: boolean) {
    this._btnIsDisabled = coerceBooleanProp(value);
  }

  /**
   * @description
   * Revisa si el button esta cargando y añade la clase 'g-btn--loading'
   */
  private _btnIsLoading = false;
  @Input()
  get btnIsLoading(): boolean {
    return this._btnIsLoading;
  }
  set btnIsLoading(value: boolean) {
    this._btnIsLoading = coerceBooleanProp(value);
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
   * text es el texto del button
   */
  private _text = '';
  @Input()
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value || '';
  }

  /**
   * @description
   * icon sostiene al icono del card, si no es seteado no aparecera
   */
  private _icon = [];
  @Input()
  get icon(): Array<string> {
    return this._icon;
  }
  set icon(value: Array<string>) {
    this._icon = Array.isArray(value) ? value : [];
  }

  /**
   * @description
   * sostiene a la clase 'g-btn--onlyicon
   */
  private _onlyIcon = false;
  @Input()
  get onlyIcon(): boolean {
    return this._onlyIcon;
  }
  set onlyIcon(value: boolean) {
    this._onlyIcon = coerceBooleanProp(value);
  }

  constructor() { }

  ngOnInit(): void { }

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
        case 'success':
          theme = 'g-btn--outline-success';
          break;
        case 'transparent':
          theme = 'g-btn--outline-transparent';
          break;
        default:
          theme = 'g-btn--outline-secondary';
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
        case 'success':
          theme = 'g-btn--success';
          break;
        case 'transparent':
          theme = 'g-btn--transparent';
          break;
        default:
          theme = 'g-btn--secondary';
          break;
      }
    }

    return `g-btn ${theme}`;
  }

  _handleClick(): void {
    this.eventClick.next();
  }

}
