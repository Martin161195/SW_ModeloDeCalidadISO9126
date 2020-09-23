import { Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Simplebar from 'simplebar';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[simplebar]',
  exportAs: 'simplebar'
})
export class SimpleBarDirective implements OnDestroy {
  scrollBar: any;
  subResize: Subscription;
  constructor(
    private readonly element: ElementRef,
    private readonly ngZone: NgZone
  ) { }

  init(): void {
    this.ngZone.runOutsideAngular(() => {
      const timeout = setTimeout(() => {
        if (!this.scrollBar) { this.scrollBar = new Simplebar(this.element.nativeElement); }
        clearTimeout(timeout);
      }, 0);
    });
  }

  goToTop(): void {
    if (this.scrollBar) {
      this.ngZone.runOutsideAngular(() => {
        if (!this.scrollBar) { this.scrollBar.getScrollElement().scrollTop = 0; }
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
        }, 0);
      });
    }
  }

  recalculate(): void {
    if (this.scrollBar) {
      this.ngZone.runOutsideAngular(() => {
        if (this.scrollBar) { this.scrollBar.recalculate(); }
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
        }, 0);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollBar) {
      this.ngZone.runOutsideAngular(() => {
        if (this.scrollBar) {
          this.scrollBar.unMount();
          this.scrollBar = null;
        }
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
        }, 0);
      });
    }
  }

}
