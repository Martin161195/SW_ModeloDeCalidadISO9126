import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[domChange]'
})
export class DomChangeDirective implements OnDestroy {

  private readonly changes: MutationObserver;

  @Output() readonly domChange: EventEmitter<MutationRecord>;

  constructor(
    private readonly elementRef: ElementRef
  ) {
    this.domChange = new EventEmitter<MutationRecord>();
    const element = this.elementRef.nativeElement;
    this.changes = new MutationObserver((mutations: Array<MutationRecord>) => {
      mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
    });

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
