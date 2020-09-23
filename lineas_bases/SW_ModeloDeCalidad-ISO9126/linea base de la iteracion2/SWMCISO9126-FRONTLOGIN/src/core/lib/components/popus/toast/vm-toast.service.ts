import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';

import { VMToastRef } from './vm-toast-ref.class';
import { VMToastComponent } from './vm-toast.component';
import { IVMToastConfig, TOAST_CONFIG_TOKEN, VMToastData } from './vm-toast.config';

@Injectable({
  providedIn: 'root'
})
export class VMToastService {
  private lastToast: VMToastRef;

  constructor(
    private readonly overlay: Overlay,
    private readonly injector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private readonly toastConfig: IVMToastConfig
  ) { }

  open(data: VMToastData): VMToastRef {
    // Return un OverlayRef wich is portal Host
    const overlayRef = this.createToast();
    // Instantiate remote control
    const toastRef = new VMToastRef(overlayRef);
    // Set last toast
    this.lastToast = toastRef;
    // Create injector
    const injector = this.createToastInjector(data, toastRef);
    // Attach toast component
    const toastPortal = new ComponentPortal(VMToastComponent, null, injector);
    overlayRef.attach(toastPortal);

    return toastRef;
  }

  private createToast(): OverlayRef {
    const overlayConfig = this.getOverlayConfig();

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.createToastPositionStrategy();

    return new OverlayConfig({
      positionStrategy,
      panelClass: 'g-toast--overlay'
    });
  }

  private createToastPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .global()
      .top(this.getPositionLastToast())
      .right(`${this.toastConfig.position.right}px`);
  }

  private getPositionLastToast(): string {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible
      ? this.lastToast.getPosition().bottom
      : this.toastConfig.position.top;

    return `${position}px`;
  }

  private createToastInjector(data: VMToastData, toastRef: VMToastRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(VMToastData, data);
    injectionTokens.set(VMToastRef, toastRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
