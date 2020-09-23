import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-touch',
  templateUrl: './vm-touch.component.html'
})
export class VMTouchComponent implements OnInit {
  @Output() readonly eventClick: EventEmitter<void>;

  /**
   * @description
   * Revisa si el button es outline
   */
  private _touchTheme = 'default';
  @Input()
  get touchTheme(): string {
    return this._touchTheme;
  }
  set touchTheme(value: string) {
    this._touchTheme = value || 'default';
  }

  /**
   * @description
   * Revisa si el button es outline
   */
  private _active = false;
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: boolean) {
    this._active = coerceBooleanProperty(value);
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

  @HostBinding('class')
  // tslint:disable-next-line:cyclomatic-complexity
  get touchThemeClass(): string {
    let theme: string;
    switch (this.touchTheme) {
      case 'primary':
        theme = 'g-touch--primary';
        break;
      case 'brand':
        theme = 'g-touch--primary';
        break;
      case 'accent':
        theme = 'g-touch--accent';
        break;
      case 'danger':
        theme = 'g-touch--danger';
        break;
      case 'dark':
        theme = 'g-touch--dark';
        break;
      case 'info':
        theme = 'g-touch--info';
        break;
      case 'metal':
        theme = 'g-touch--metal';
        break;
      case 'orange':
        theme = 'g-touch--orange';
        break;
      case 'purple':
        theme = 'g-touch--purple';
        break;
      case 'success':
        theme = 'g-touch--success';
        break;
      case 'transparent':
        theme = 'g-touch--transparent';
        break;
      case 'yellow':
        theme = 'g-touch--yellow';
        break;
      default:
        theme = 'g-touch--secondary';
        break;
    }

    return `g-touch g-touch__standar ${theme}`;
  }

  @HostBinding('class.active')
  get pillClass(): boolean {
    return this.active;
  }

  @HostListener('click', ['$event']) handleKeydownOnHost(event: any): void {
    this.eventClick.emit();
  }

  constructor() {
    this.eventClick = new EventEmitter<void>();
  }

  ngOnInit(): void { }

}
