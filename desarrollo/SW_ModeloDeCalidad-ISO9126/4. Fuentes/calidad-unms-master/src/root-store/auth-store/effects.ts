import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalService } from '@providers/services/local/local.service';
import { UserLocalService } from '@providers/services/user-local/user-local.service';
import { AuthUserLocal } from '@shared/models/user-local/user-local.class';
import {
  IUserLocalLoginRequest,
  IUserLocalSigninRequest
} from '@shared/models/user-local/user-local.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { clearAppointment } from '@store/appointment-store/actions';
import { clearCategory } from '@store/category-store/actions';
import { clearCurrency } from '@store/currency-store/actions';
import { clearEstablishment } from '@store/establishment-store/actions';
import { clearGeneral } from '@store/general-store/actions';
import { RootStoreState } from '@store/index';
import { clearPlan } from '@store/local-store/actions';
import { clearPaymentMethod } from '@store/payment-method-store/actions';
import { clearProduct } from '@store/product-store/actions';
import { clearPromotion } from '@store/promotion-store/actions';
import { clearService } from '@store/service-store/actions';
import { clearStatusAppointment } from '@store/status-appointment-store/actions';
import { clearUserApp } from '@store/user-app-store/actions';
import { clearUserEstablishmentSchedule } from '@store/user-establishment-schedule-store/actions';
import { clearUserEstablishment } from '@store/user-establishment-store/actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthStoreActions from './actions';

@Injectable()
export class AuthStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<RootStoreState.State>,
    private readonly userLocalService: UserLocalService,
    private readonly localService: LocalService
  ) { }

  loginEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.login),
      map((action: { credentials: IUserLocalLoginRequest }) => action.credentials),
      switchMap((credentials: IUserLocalLoginRequest) => {
        return this.userLocalService.login({ ...credentials })
          .pipe(
            map((user: AuthUserLocal) => AuthStoreActions.loginSuccess({ auth: user })),
            catchError((error: VMError) => of(AuthStoreActions.authFailure({ data: error })))
          );
      })
    ));

  loginSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.loginSuccess),
      map((action: { auth: AuthUserLocal }) => action.auth),
      tap((auth: AuthUserLocal) => {
        localStorage.setItem('user', JSON.stringify(auth.user));
        localStorage.setItem('security', btoa(auth.token));
      }),
      switchMap(() => of(AuthStoreActions.authSuccess({ data: new VMSuccess({ message: 'SAUTHS_002' }) })))
    ));

  signinEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.signin),
      map((action: { newUserLocal: IUserLocalSigninRequest }) => action.newUserLocal),
      switchMap((payload: IUserLocalSigninRequest) => this.userLocalService.signin(payload)
        .pipe(
          map((response: VMSuccess) => AuthStoreActions.signinSuccess({ data: response })),
          catchError((error: VMError) => of(AuthStoreActions.authFailure({ data: error })))
        ))
    ));

  verifyEmailEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.verifyEmail),
      map((action: { token: string }) => action.token),
      switchMap((token: string) => this.userLocalService.verifyEmail(token)
        .pipe(
          map((response: VMSuccess) => AuthStoreActions.verifyEmailSuccess({ data: response })),
          catchError((error: VMError) => of(AuthStoreActions.verifyEmailFailure({ data: error })))
        ))
    ));

  signinAndVerifyEmailSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.signinSuccess, AuthStoreActions.verifyEmailSuccess),
      switchMap(() => of(AuthStoreActions.successToNull()))
    ));

  verifyEmailFailureEffect$: Observable<any> = this.actions$
    .pipe(
      ofType(AuthStoreActions.verifyEmailFailure),
      switchMap(() => of(AuthStoreActions.successToNull()))
    );

  logoutEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.logout),
      tap(() => {
        this.localService.setPlanInner(null);
        this.store$.dispatch(clearPlan());
        this.store$.dispatch(clearAppointment());
        this.store$.dispatch(clearCategory());
        this.store$.dispatch(clearCurrency());
        this.store$.dispatch(clearEstablishment());
        this.store$.dispatch(clearGeneral());
        this.store$.dispatch(clearPaymentMethod());
        this.store$.dispatch(clearProduct());
        this.store$.dispatch(clearPromotion());
        this.store$.dispatch(clearService());
        this.store$.dispatch(clearStatusAppointment());
        this.store$.dispatch(clearUserApp());
        this.store$.dispatch(clearUserEstablishmentSchedule());
        this.store$.dispatch(clearUserEstablishment());
        localStorage.removeItem('user');
        localStorage.removeItem('security');
        localStorage.removeItem('establishmentId');
      }),
      switchMap(() => of(AuthStoreActions.successToNull()))
    ));

  authFailureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.authFailure),
      switchMap(() => of(AuthStoreActions.errorToNull()))
    ));

  authSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.authSuccess),
      switchMap(() => of(AuthStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthStoreActions.successToNull)
    ), { dispatch: false });

}
