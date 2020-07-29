import { InjectionToken, Type } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, RouterEvent } from '@angular/router';

export interface IVMProgressRouterConfig {
  id?: string;
  delay?: number;
  startEvents?: Array<Type<RouterEvent | RouteConfigLoadStart>>;
  completeEvents?: Array<Type<RouterEvent | RouteConfigLoadEnd>>;
}

export const VM_PROGRESS_ROUTER_CONFIG = new InjectionToken<IVMProgressRouterConfig>('IVMProgressRouterConfig');
