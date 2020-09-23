import { InjectionToken, TemplateRef } from '@angular/core';

export class VMToastData {
  type: VMToastType;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export type VMToastType = 'warning' | 'info' | 'success' | 'danger' | 'default';

export interface IVMToastConfig {
  position?: {
    top: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

export const defaultToastConfig: IVMToastConfig = {
  position: {
    top: 20,
    right: 0
  },
  animation: {
    fadeOut: 100,
    fadeIn: 100
  }
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('vm-toast-config');
