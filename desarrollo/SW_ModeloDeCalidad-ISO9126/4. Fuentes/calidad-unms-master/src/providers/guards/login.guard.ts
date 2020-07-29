import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthStoreSelectors } from '@store/auth-store';
import { RootStoreState } from '@store/index';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  canActivate(): Observable<boolean> {
    return this.store$.
      pipe(
        select(AuthStoreSelectors.selectAuthIsAuthenticated),
        tap((isAuthenticated: boolean) => {
          if (isAuthenticated) { void this.router.navigate(['/']); }
        }),
        switchMap((isAuthenticated: boolean) => of(!isAuthenticated))
      );
  }
}
