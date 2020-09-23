import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-alert-footer',
  templateUrl: './vm-alert-footer.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.g-alert__footer]': 'true'
  }
})
export class VMAlertFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
