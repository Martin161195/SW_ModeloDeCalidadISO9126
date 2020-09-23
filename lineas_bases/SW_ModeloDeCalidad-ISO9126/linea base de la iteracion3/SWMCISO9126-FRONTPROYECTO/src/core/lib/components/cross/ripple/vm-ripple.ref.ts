import { IVMRippleConfig, VMRippleRenderer } from './vm-ripple.renderer';

/** Possible states for a ripple element. */
export enum VMRippleState {
  FADING_IN, VISIBLE, FADING_OUT, HIDDEN
}

/**
 * Reference to a previously launched ripple element.
 */
export class VMRippleRef {

  /** Current state of the ripple. */
  state: VMRippleState = VMRippleState.HIDDEN;

  constructor(
    readonly _renderer: VMRippleRenderer,
    /** Reference to the ripple HTML element. */
    public element: HTMLElement,
    /** Ripple configuration used for the ripple. */
    public config: IVMRippleConfig) {
  }

  /** Fades out the ripple element. */
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
}
