import { Platform } from '@angular/cdk/platform';
import {
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { VMRippleRef } from './vm-ripple.ref';
import { IVMRippleAnimationConfig, IVMRippleConfig, IVMRippleTarget, VMRippleRenderer } from './vm-ripple.renderer';

/** Configurable options for `matRipple`. */
export interface IVMRippleGlobalOptions {
  /**
   * Whether ripples should be disabled. Ripples can be still launched manually by using
   * the `launch()` method. Therefore focus indicators will still show up.
   */
  disabled?: boolean;

  /**
   * Configuration for the animation duration of the ripples. There are two phases with different
   * durations for the ripples. The animation durations will be overwritten if the
   * `NoopAnimationsModule` is being used.
   */
  animation?: IVMRippleAnimationConfig;

  /**
   * Whether ripples should start fading out immediately after the mouse or touch is released. By
   * default, ripples will wait for the enter animation to complete and for mouse or touch release.
   */
  terminateOnPointerUp?: boolean;
}

/** Injection token that can be used to specify the global ripple options. */
export const VM_RIPPLE_GLOBAL_OPTIONS = new InjectionToken<IVMRippleGlobalOptions>('vm-ripple-global-options');

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[vm-ripple], [vmRipple]',
  exportAs: 'vmRipple',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'vm-ripple',
    '[class.vm-ripple-unbounded]': 'unbounded'
  }
})
export class VMRippleDirective implements OnInit, OnDestroy, IVMRippleTarget {

  /** Custom color for all ripples. */
  @Input('vmRippleColor') color: string;

  /** Whether the ripples should be visible outside the component's bounds. */
  @Input('vmRippleUnbounded') unbounded: boolean;

  /**
   * Whether the ripple always originates from the center of the host element's bounds, rather
   * than originating from the location of the click event.
   */
  @Input('vmRippleCentered') centered: boolean;

  /**
   * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
   * will be the distance from the center of the ripple to the furthest corner of the host element's
   * bounding rectangle.
   */
  @Input('vmRippleRadius') radius = 0;

  /**
   * Configuration for the ripple animation. Allows modifying the enter and exit animation
   * duration of the ripples. The animation durations will be overwritten if the
   * `NoopAnimationsModule` is being used.
   */
  @Input('vmRippleAnimation') animation: IVMRippleAnimationConfig;

  /**
   * Whether click events will not trigger the ripple. Ripples can be still launched manually
   * by using the `launch()` method.
   */
  private _disabled = false;
  @Input('vmRippleDisabled')
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
    this._setupTriggerEventsIfEnabled();
  }

  /**
   * The element that triggers the ripple when click events are received.
   * Defaults to the directive's host element.
   */
  private _trigger: HTMLElement;
  @Input('vmRippleTrigger')
  get trigger() { return this._trigger || this._elementRef.nativeElement; }
  set trigger(trigger: HTMLElement) {
    this._trigger = trigger;
    this._setupTriggerEventsIfEnabled();
  }

  /** Renderer for the ripple DOM manipulations. */
  private readonly _rippleRenderer: VMRippleRenderer;

  /** Options that are set globally for all ripples. */
  private readonly _globalOptions: IVMRippleGlobalOptions;

  /** Whether ripple directive is initialized and the input bindings are set. */
  private _isInitialized = false;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    ngZone: NgZone,
    platform: Platform,
    @Optional() @Inject(VM_RIPPLE_GLOBAL_OPTIONS) globalOptions?: IVMRippleGlobalOptions,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {

    this._globalOptions = globalOptions || {};
    this._rippleRenderer = new VMRippleRenderer(this, ngZone, _elementRef, platform);

    if (animationMode === 'NoopAnimations') {
      this._globalOptions.animation = { enterDuration: 0, exitDuration: 0 };
    }
  }

  ngOnInit() {
    this._isInitialized = true;
    this._setupTriggerEventsIfEnabled();
  }

  ngOnDestroy() {
    this._rippleRenderer._removeTriggerEvents();
  }

  /** Fades out all currently showing ripple elements. */
  fadeOutAll() {
    this._rippleRenderer.fadeOutAll();
  }

  /**
   * Ripple configuration from the directive's input values.
   * @docs-private Implemented as part of IVMRippleTarget
   */
  get rippleConfig(): IVMRippleConfig {
    return {
      centered: this.centered,
      radius: this.radius,
      color: this.color,
      animation: { ...this._globalOptions.animation, ...this.animation },
      terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
    };
  }

  /**
   * Whether ripples on pointer-down are disabled or not.
   * @docs-private Implemented as part of IVMRippleTarget
   */
  get rippleDisabled(): boolean {
    return this.disabled || !!this._globalOptions.disabled;
  }

  /** Sets up the trigger event listeners if ripples are enabled. */
  private _setupTriggerEventsIfEnabled() {
    if (!this.disabled && this._isInitialized) {
      this._rippleRenderer.setupTriggerEvents(this.trigger);
    }
  }

  /**
   * Launches a manual ripple using the specified ripple configuration.
   * @param config Configuration for the manual ripple.
   */
  launch(config: IVMRippleConfig): VMRippleRef;

  /**
   * Launches a manual ripple at the specified coordinates within the element.
   * @param x Coordinate within the element, along the X axis at which to fade-in the ripple.
   * @param y Coordinate within the element, along the Y axis at which to fade-in the ripple.
   * @param config Optional ripple configuration for the manual ripple.
   */
  launch(x: number, y: number, config?: IVMRippleConfig): VMRippleRef;

  /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
  launch(configOrX: number | IVMRippleConfig, y: number = 0, config?: IVMRippleConfig): VMRippleRef {
    if (typeof configOrX === 'number') {
      return this._rippleRenderer.fadeInRipple(configOrX, y, { ...this.rippleConfig, ...config });
    }

    return this._rippleRenderer.fadeInRipple(0, 0, { ...this.rippleConfig, ...configOrX });
  }
}
