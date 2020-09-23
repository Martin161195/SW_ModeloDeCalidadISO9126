import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-card-header',
  templateUrl: './vm-card-header.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'g-card__header'
  }
})
export class VMCardHeaderComponent implements OnInit {

  /**
   * @description
   * text es el titulo del card
   */
  private _title = '';
  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value || '';
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

  constructor() { }

  ngOnInit(): void { }
}
