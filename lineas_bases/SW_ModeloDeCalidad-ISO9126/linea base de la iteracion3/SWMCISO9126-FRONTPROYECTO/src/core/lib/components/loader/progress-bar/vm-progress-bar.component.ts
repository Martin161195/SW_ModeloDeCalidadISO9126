import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-progress-bar',
  templateUrl: './vm-progress-bar.component.html'
})
export class VMProgressBarComponent implements OnInit {

  @HostBinding('class')
  get wrapperProgressBar(): string {
    return 'g-progress__bar';
  }

  constructor() { }

  ngOnInit(): void { }
}
