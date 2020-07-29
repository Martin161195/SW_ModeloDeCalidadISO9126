import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-touch-list',
  templateUrl: './vm-touch-list.component.html'
})
export class VMTouchListComponent implements OnInit {

  @HostBinding('class')
  // tslint:disable-next-line:cyclomatic-complexity
  get touchThemeClass(): string {
    return `g-touch__list-wrapper`;
  }

  constructor() { }

  ngOnInit(): void { }

}
