import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { distinct, filter, first, flatMap, toArray } from 'rxjs/operators';
import { IBreadcrumb, wrapIntoObservable } from '../vm-breadcrumb.shared';
import { VMBreadcrumbConfig } from './vm-breadcrumb.config';
import { VMBreadcrumbResolver } from './vm-breadcrumb.resolver';

@Injectable()
export class VMBreadcrumbService {

  private readonly breadcrumbs$ = new BehaviorSubject<Array<IBreadcrumb>>([]);
  private readonly defaultResolver$ = new VMBreadcrumbResolver();

  constructor(
    private readonly router: Router,
    private readonly config: VMBreadcrumbConfig,
    private readonly injector: Injector
  ) {

    this.router.events
      .pipe(filter((x: RouterEvent) => x instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoot = router.routerState.snapshot.root;

        this.resolveCrumbs(currentRoot)
          .pipe(
            flatMap((x: Array<IBreadcrumb>) => x),
            distinct((x: IBreadcrumb) => x.text),
            toArray(),
            flatMap((x: Array<IBreadcrumb>) => {
              if (this.config.postProcess) {
                const y = this.config.postProcess(x);

                return wrapIntoObservable<Array<IBreadcrumb>>(y)
                  .pipe(first());
              }

              return of(x);
            }))
          .subscribe((x: Array<IBreadcrumb>) => {
            this.breadcrumbs$.next(x);
          });
      });
  }

  get crumbs$(): Observable<Array<IBreadcrumb>> {
    return this.breadcrumbs$;
  }

  private resolveCrumbs(route: ActivatedRouteSnapshot): Observable<Array<IBreadcrumb>> {
    let crumbs$: Observable<Array<IBreadcrumb>>;

    const data = route.routeConfig &&
      route.routeConfig.data;

    if (data && data.breadcrumb) {

      let resolver: VMBreadcrumbResolver;

      resolver = (data.breadcrumb.prototype instanceof VMBreadcrumbResolver)
        ? this.injector.get<any>(data.breadcrumb)
        : this.defaultResolver$;

      const result = resolver.resolve(route, this.router.routerState.snapshot);
      crumbs$ = wrapIntoObservable<Array<IBreadcrumb>>(result)
        .pipe(first());

    } else {
      crumbs$ = of([]);
    }

    if (route.firstChild) {
      crumbs$ = concat(crumbs$, this.resolveCrumbs(route.firstChild));
    }

    return crumbs$;
  }
}
