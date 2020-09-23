import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-modal-body',
  templateUrl: './vm-modal-body.component.html'
})
export class VMModalBodyComponent implements OnInit {

  @HostBinding('class')
  get deafultClass(): string {
    return 'g-modal__body';
  }

  constructor() { }

  ngOnInit(): void { }
}
