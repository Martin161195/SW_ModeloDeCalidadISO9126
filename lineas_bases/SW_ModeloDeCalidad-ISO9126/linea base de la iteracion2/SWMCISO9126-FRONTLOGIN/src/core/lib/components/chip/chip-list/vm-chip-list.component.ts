import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-chip-list',
  templateUrl: './vm-chip-list.component.html'
})
export class VMChipListComponent implements OnInit {

  @HostBinding('class')
  // tslint:disable-next-line:cyclomatic-complexity
  get chipThemeClass(): string {
    return `g-chip__list-wrapper`;
  }

  constructor() { }

  ngOnInit(): void { }

}
