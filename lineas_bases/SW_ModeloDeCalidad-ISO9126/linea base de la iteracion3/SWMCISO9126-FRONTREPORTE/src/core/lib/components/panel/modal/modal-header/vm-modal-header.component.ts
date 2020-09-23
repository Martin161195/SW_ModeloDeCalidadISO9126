import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-modal-header',
  templateUrl: './vm-modal-header.component.html'
})
export class VMModalHeaderComponent implements OnInit {
  eClickClose: Subject<void>;
  private _title = '';
  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  @HostBinding('class')
  get defaultClass(): string {
    return 'g-modal__header';
  }

  constructor() {
    this.eClickClose = new Subject<void>();
  }

  ngOnInit(): void { }

  clickCloseButton(): void {
    this.eClickClose.next();
  }

}
