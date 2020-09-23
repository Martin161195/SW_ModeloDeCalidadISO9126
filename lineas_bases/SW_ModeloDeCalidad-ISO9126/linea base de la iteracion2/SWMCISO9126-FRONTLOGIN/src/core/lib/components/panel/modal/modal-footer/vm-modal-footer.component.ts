import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-modal-footer',
  templateUrl: './vm-modal-footer.component.html'
})
export class VMModalFooterComponent implements OnInit {

  @HostBinding('class')
  get defaultClass(): string {
    return 'g-modal__footer';
  }

  constructor() { }

  ngOnInit(): void { }
}
