import { OverlayRef } from '@angular/cdk/overlay';

export class VMToastRef {
  constructor(
    private readonly overlay: OverlayRef
  ) { }

  close(): void {
    this.overlay.dispose();
  }

  isVisible(): boolean {
    return !!this.overlay && !!this.overlay.overlayElement;
  }

  getPosition(): any {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
