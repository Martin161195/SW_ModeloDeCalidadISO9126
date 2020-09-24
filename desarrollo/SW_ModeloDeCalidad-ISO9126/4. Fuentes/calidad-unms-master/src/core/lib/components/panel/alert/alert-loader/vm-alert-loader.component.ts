import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-alert-loader',
  templateUrl: './vm-alert-loader.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.g-alert__loader]': 'true'
  }
})
export class VMAlertLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
