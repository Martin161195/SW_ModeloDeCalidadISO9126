import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-card-body',
  templateUrl: './vm-card-body.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'g-card__body'
  }
})
export class VMCardBodyComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
