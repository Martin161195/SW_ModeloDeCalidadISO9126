import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-single-bar',
  templateUrl: './vm-single-bar.component.html'
})
export class VMSingleBarComponent implements OnInit {

  private _label = '';
  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value || '';
  }

  private _percent = 0;
  @Input()
  get percent(): number {
    return this._percent;
  }
  set percent(value: number) {
    this._percent = value || 0;
  }

  @HostBinding('class')
  get rootClass(): string {
    return 'g-single__bar';
  }

  constructor() { }

  ngOnInit(): void { }
}
