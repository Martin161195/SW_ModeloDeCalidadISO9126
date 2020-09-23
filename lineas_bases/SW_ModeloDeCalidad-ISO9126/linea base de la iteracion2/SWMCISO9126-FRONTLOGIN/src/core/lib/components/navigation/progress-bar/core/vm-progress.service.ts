import { Inject, Injectable, Optional } from '@angular/core';
import { VMProgressRef } from './vm-progress-ref';
import { IVMProgressConfig, VM_PROGRESS_CONFIG } from './vm-progress.interface';

const defaultConfig: IVMProgressConfig = {
  min: 8,
  max: 100,
  speed: 200,
  debounceTime: 0,
  trickleSpeed: 300,
  fixed: true,
  meteor: true,
  thick: false,
  spinner: true,
  ease: 'linear',
  color: '#f66737',
  direction: 'ltr+',
  spinnerPosition: 'right',
  trickleFunc: (n: number): number => {
    if (n >= 0 && n < 20) { return 10; }
    if (n >= 20 && n < 50) { return 4; }
    if (n >= 50 && n < 80) { return 2; }
    if (n >= 80 && n < 99) { return 0.5; }

    return 0;
  }
};

@Injectable({
  providedIn: 'root'
})
export class VMProgress {

  /** Store progress bar instances */
  private readonly _instances = new Map<string, VMProgressRef>();

  /** Global config */
  config: IVMProgressConfig;

  constructor(
    @Optional() @Inject(VM_PROGRESS_CONFIG) config: IVMProgressConfig
  ) {
    this.config = config ? { ...defaultConfig, ...config } : defaultConfig;
  }

  /**
   * Get or Create progress bar by ID
   * @param string id
   * @param IVMProgressConfig config
   */
  ref(id = 'root', config?: IVMProgressConfig): VMProgressRef {
    if (this._instances.has(id)) {
      // Get ProgressRef instance
      // tslint:disable-next-line: no-shadowed-variable
      const progressRef = this._instances.get(id);
      if (config) {
        progressRef.setConfig({ ...this.config, ...config });
      }

      return progressRef;
    }
    // Create new ProgressRef instance
    const progressRef = new VMProgressRef({ ...this.config, ...config }, this.deleteInstance(id));

    return this._instances.set(id, progressRef)
      .get(id);

  }

  /**
   * Destroy all progress bar instances
   */
  destroyAll(): void {
    this._instances.forEach((ref: VMProgressRef) => ref.destroy());
  }

  /**
   * A destroyer function for each progress bar instance
   */
  private deleteInstance(id: string): any {
    return () => {
      this._instances.delete(id);
    };
  }
}
