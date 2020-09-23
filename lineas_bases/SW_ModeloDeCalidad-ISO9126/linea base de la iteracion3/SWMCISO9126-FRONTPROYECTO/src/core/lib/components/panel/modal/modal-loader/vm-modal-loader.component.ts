import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-modal-loader',
  templateUrl: './vm-modal-loader.component.html'
})
export class VMModalLoaderComponent implements OnInit {

  @HostBinding('class')
  get defaultClass(): string {
    return 'g-modal__loader';
  }

  constructor() { }

  ngOnInit(): void { }
}
