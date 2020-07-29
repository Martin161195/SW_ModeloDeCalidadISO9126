import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-alert-header',
  templateUrl: './vm-alert-header.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.g-alert__header]': 'true'
  }
})
export class VMAlertHeaderComponent implements OnInit {

  private _icon: Array<string> = ['fas', 'exclamation-circle'];
  @Input()
  get icon(): Array<string> {
    return this._icon;
  }
  set icon(value: Array<string>) {
    this._icon = Array.isArray(value) ? value : [];
  }

  private _title = '';
  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  private _align = 'center';
  @Input()
  get align(): string {
    return this._align;
  }
  set align(value: string) {
    // tslint:disable-next-line: prefer-conditional-expression
    if (value === 'center' || value === 'start' || value === 'end') {
      this._align = value;
    } else {
      this._align = 'center';
    }
  }

  eClickClose: Subject<void>;

  constructor() {
    this.eClickClose = new Subject<void>();
  }

  ngOnInit(): void { }

  clickCloseButton(): void {
    this.eClickClose.next();
  }

}
