import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-chip',
  templateUrl: './vm-chip.component.html'
})
export class VMChipComponent implements OnInit {
  @Output() readonly eventClick: EventEmitter<void>;

  /**
   * @description
   * Revisa si el button es outline
   */
  private _chipTheme = 'default';
  @Input()
  get chipTheme(): string {
    return this._chipTheme;
  }
  set chipTheme(value: string) {
    this._chipTheme = value || 'default';
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

  @HostBinding('class')
  // tslint:disable-next-line:cyclomatic-complexity
  get chipThemeClass(): string {
    let theme: string;
    switch (this.chipTheme) {
      case 'primary':
        theme = 'g-chip--primary';
        break;
      case 'brand':
        theme = 'g-chip--primary';
        break;
      case 'accent':
        theme = 'g-chip--accent';
        break;
      case 'danger':
        theme = 'g-chip--danger';
        break;
      case 'dark':
        theme = 'g-chip--dark';
        break;
      case 'info':
        theme = 'g-chip--info';
        break;
      case 'metal':
        theme = 'g-chip--metal';
        break;
      case 'orange':
        theme = 'g-chip--orange';
        break;
      case 'purple':
        theme = 'g-chip--purple';
        break;
      case 'success':
        theme = 'g-chip--success';
        break;
      case 'transparent':
        theme = 'g-chip--transparent';
        break;
      case 'yellow':
        theme = 'g-chip--yellow';
        break;
      default:
        theme = 'g-chip--secondary';
        break;
    }

    return `g-chip g-chip__standar ${theme}`;
  }

  @HostBinding('class.g-chip--whit-icon')
  get pillClass(): boolean {
    return !!this.icon.length;
  }

  constructor() {
    this.eventClick = new EventEmitter<void>();
  }

  clickIcon(): void {
    this.eventClick.emit();
  }

  ngOnInit(): void { }

}
