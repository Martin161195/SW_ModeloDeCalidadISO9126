import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '.g-table__container'
})
export class VMTableWrapperDirective {

  constructor(
    private readonly el: ElementRef
  ) { }

  getWidth(): number {
    return this.el.nativeElement.getBoundingClientRect().width;
  }
}
