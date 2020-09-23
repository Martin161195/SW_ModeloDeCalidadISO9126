import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { isEnabledByArrayPlanCode } from '@core/common/permission';
import { select, Store } from '@ngrx/store';
import { LocalService } from '@providers/services/local/local.service';
import { Plan } from '@shared/models/plan/plan.class';
import { RootStoreState } from '@store/index';
import { setPlan } from '@store/local-store/actions';
import { selectPlan } from '@store/local-store/selectors';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router,
    private readonly store$: Store<RootStoreState.State>,
    private readonly localService: LocalService
  ) { }

  canActivate(): Observable<boolean> {

    return this.localService
      .getPlanInner()
      .pipe(
        tap((plan: Plan) => {
          this.store$.dispatch(setPlan({ plan }));
        }),
        map((plan: Plan) => !!plan)
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.store$
      .pipe(
        select(selectPlan),
        switchMap((plan: Plan) => {
          const isEnabled = route && route.data.plans
            ? isEnabledByArrayPlanCode(route.data.plans, plan)
            : false;

          if (!isEnabled) { void this.router.navigate(['/store']); }

          return of(isEnabled);
        })
      );
  }

}
