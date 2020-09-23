import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const _window = (): any => {
  return window;
};

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  currentWidth: number;
  resizeEvent: BehaviorSubject<number>;
  constructor() {
    this.currentWidth = this.getNativeWindow().innerWidth;
    this.resizeEvent = new BehaviorSubject<number>(this.currentWidth);
    fromEvent(this.getNativeWindow(), 'resize')
      .pipe(distinctUntilChanged())
      .subscribe((event: any) => {
        this.currentWidth = event.target.innerWidth;
        this.resizeEvent.next(this.currentWidth);
      });
  }

  getNativeWindow(): any {
    return _window();
  }

  getEvent(): BehaviorSubject<number> {
    return this.resizeEvent;
  }

  isResponsive(): boolean {
    return this.currentWidth < 768;
  }

}
