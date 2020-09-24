import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-alert-body',
  templateUrl: './vm-alert-body.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.g-alert__body]': 'true'
  }
})
export class VMAlertBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
