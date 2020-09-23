import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-form-group',
  templateUrl: './vm-form-group.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-group'
  }
})
export class VMFormGroupComponent {
  constructor() { }
}
