import { Inject, Injectable, Optional, Type } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterEvent
} from '@angular/router';
import { VMProgress } from '@core/lib/components/navigation/progress-bar/core/vm-progress.service';
import { of } from 'rxjs';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { IVMProgressRouterConfig, VM_PROGRESS_ROUTER_CONFIG } from './vm-progress-router.interface';

const eventExists = (routerEvent: RouterEvent, events: Array<Type<RouterEvent | RouteConfigLoadEnd | RouteConfigLoadStart>>): boolean => {
  let res = false;
  events.map((event: Type<RouterEvent>) => res = res || routerEvent instanceof event);

  return res;
};

@Injectable({
  providedIn: 'root'
})
export class VMProgressRouter {
  private readonly _config: IVMProgressRouterConfig = {
    id: 'root',
    delay: 0,
    startEvents: [NavigationStart],
    completeEvents: [NavigationEnd, NavigationCancel, NavigationError]
  };

  constructor(
    progress: VMProgress,
    router: Router,
    @Optional() @Inject(VM_PROGRESS_ROUTER_CONFIG) config: IVMProgressRouterConfig
  ) {
    this._config = config ? { ...this._config, ...config } : this._config;
    const progressRef = progress.ref(this._config.id);

    const startProgress = of({})
      .pipe(
        tap(() => progressRef.start())
      );

    const completeProgress = of({})
      .pipe(
        delay(this._config.delay),
        tap(() => progressRef.complete())
      );

    const filterEvents = [...this._config.startEvents, ...this._config.completeEvents];

    router.events.pipe(
      filter((event: RouterEvent) => eventExists(event, filterEvents)),
      switchMap((event: RouterEvent) => eventExists(event, this._config.startEvents) ? startProgress : completeProgress)
    )
      .subscribe();
  }
}
