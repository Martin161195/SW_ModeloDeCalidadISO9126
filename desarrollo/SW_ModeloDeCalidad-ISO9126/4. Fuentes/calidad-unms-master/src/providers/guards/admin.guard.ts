import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthStoreSelectors } from '@store/auth-store';
import { RootStoreState } from '@store/index';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  canActivate(): Observable<boolean> {

    return this.store$
      .pipe(
        select(AuthStoreSelectors.selectAuthIsAuthenticated),
        tap((isAuthenticated: boolean) => {
          if (!isAuthenticated) { void this.router.navigate(['/auth/login']); }
        })
      );
  }
}
