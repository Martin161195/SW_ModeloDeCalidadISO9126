import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthStoreActions, AuthStoreSelectors } from '@store/auth-store';
import { RootStoreState } from '@store/index';
import { merge, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-verify-email-component',
  templateUrl: './verify-email.component.html'
})

export class VerifyEmailComponent implements OnDestroy, OnInit {

  subRoute: Subscription;
  subAuth: Subscription;

  constructor(
    private readonly store$: Store<RootStoreState.State>,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subRoute = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        const token = paramMap.get('token');
        this.store$.dispatch(AuthStoreActions.verifyEmail({ token }));
      });

    const success$: Observable<string | null> = this.store$.pipe(select(AuthStoreSelectors.selectAuthSuccess));
    const error$: Observable<string | null> = this.store$.pipe(select(AuthStoreSelectors.selectAuthError));

    this.subAuth = merge(success$, error$)
      .pipe(filter((text: string | null) => !!text))
      .subscribe(() => {
        this.router.navigate(['/authentication/login']);
      });
  }

  ngOnDestroy(): void {
    if (!!this.subRoute) { this.subRoute.unsubscribe(); }
    if (!!this.subAuth) { this.subAuth.unsubscribe(); }
  }

}
