import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-card-loader',
  templateUrl: './vm-card-loader.component.html'
})
export class VMCardLoaderComponent implements OnInit {

  @HostBinding('class')
  get defaultClass(): string {
    return 'g-card__loader';
  }

  constructor() { }

  ngOnInit(): void { }
}
