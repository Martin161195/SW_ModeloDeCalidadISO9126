import { InjectionToken } from '@angular/core';

export interface IVMProgressState {
  active?: boolean;
  value?: number;
}

export interface IVMProgressConfig {
  spinnerPosition?: 'left' | 'right';
  direction?: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-';
  ease?: string;
  color?: string;
  thick?: boolean;
  fixed?: boolean;
  meteor?: boolean;
  spinner?: boolean;
  max?: number;
  min?: number;
  speed?: number;
  trickleSpeed?: number;
  debounceTime?: number;
  trickleFunc?(n: number): number;
}

export const VM_PROGRESS_CONFIG = new InjectionToken<IVMProgressConfig>('IVMProgressConfig');
