import { AnimationEvent } from '@angular/animations';
import { Component, HostBinding, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { VMToastRef } from './vm-toast-ref.class';
import { VMToastAnimations, VMToastAnimationState } from './vm-toast.animation';
import { IVMToastConfig, TOAST_CONFIG_TOKEN, VMToastData } from './vm-toast.config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-toast',
  templateUrl: './vm-toast.component.html',
  animations: [
    VMToastAnimations.animateToast
  ]
})
export class VMToastComponent implements OnInit, OnDestroy {

  private _icon = [];
  get icon(): Array<string> {
    return this._icon;
  }
  set icon(value: Array<string>) {
    this._icon = Array.isArray(value) ? value : [];
  }

  private _animationState: VMToastAnimationState = 'default';
  get animationState(): VMToastAnimationState {
    return this._animationState;
  }
  set animationState(animation: VMToastAnimationState) {
    this._animationState = animation;
  }

  private intervalId: any;

  @HostBinding('class')
  get toastThemeClass(): string {
    return 'g-toast';
  }

  @HostBinding('class.g-toast--danger')
  get toastThemeClassDanger(): boolean {
    return this.toastData.type === 'danger';
  }

  @HostBinding('class.g-toast--info')
  get toastThemeClassInfo(): boolean {
    return this.toastData.type === 'info';
  }

  @HostBinding('class.g-toast--success')
  get toastThemeClassSuccess(): boolean {
    return this.toastData.type === 'success';
  }

  @HostBinding('class.g-toast--warning')
  get toastThemeClassWarning(): boolean {
    return this.toastData.type === 'warning';
  }

  @HostBinding('@toastAnimation')
  get toastAnimation(): any {
    return {
      value: this.animationState,
      params: {
        fadeIn: this.toastConfig.animation.fadeIn,
        fadeOut: this.toastConfig.animation.fadeOut
      }
    };
  }

  @HostListener('@toastAnimation.done', ['$event']) handleToastAnimationDone(event: AnimationEvent): void {
    const { toState } = event;
    const isFadeOut = (toState as VMToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }

  constructor(
    readonly toastData: VMToastData,
    readonly toastRef: VMToastRef,
    @Inject(TOAST_CONFIG_TOKEN) private readonly toastConfig: IVMToastConfig
  ) {
    switch (this.toastData.type) {
      case 'danger':
        this.icon = ['fas', 'info-circle'];
        break;
      case 'info':
        this.icon = ['fas', 'info-circle'];
        break;
      case 'success':
        this.icon = ['fas', 'check-circle'];
        break;
      case 'warning':
        this.icon = ['fas', 'exclamation-triangle'];
        break;
      default:
        this.icon = [];
        break;
    }
  }

  ngOnInit(): void {
    this.intervalId = setTimeout(() => this.eventClose(), 5000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

  eventClose(): void {
    this.animationState = 'closing';
  }

  close(): void {
    this.toastRef.close();
  }

}
