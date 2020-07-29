import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { UserLocalService } from '@providers/services/user-local/user-local.service';
import { LocalEstablishment, LocalEstablishmentResponse } from '@shared/models/local-establishment/local-establishment.class';
import {
  IEstablishmentStatusEditRequest,
  ILocalEstablishmentCreateRequest,
  ILocalEstablishmentInformationForm
} from '@shared/models/local-establishment/local-establishment.interface';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectAuthUser } from '@store/auth-store/selectors';
import { getEstablishmentCategories } from '@store/category-store/actions';
import { getEstablishmentCurrencies, getEstablishmentCurrencyBase } from '@store/currency-store/actions';
import { RootStoreState } from '@store/index';
import { getModulesEnabled } from '@store/module-store/actions';
import { getEstablishmentPaymentMethods } from '@store/payment-method-store/actions';
import { getProductsAllOff } from '@store/product-store/actions';
import { getPromotionsAllOff } from '@store/promotion-store/actions';
import { getServicesAllOff } from '@store/service-store/actions';
import { getEstablishmentStatusAppointments } from '@store/status-appointment-store/actions';
import { clearQueryForGetSchedules } from '@store/user-establishment-schedule-store/actions';
import { getUsersEstablishmentAllOff } from '@store/user-establishment-store/actions';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import * as EstablishmentStoreActions from './actions';
import { selectEstablishment, selectEstablishments } from './selectors';

@Injectable()
export class EstablishmentStoreEffects {
  isAsync: boolean;
  query: any;
  constructor(
    private readonly actions$: Actions,
    private readonly service: LocalEstablishmentService,
    private readonly serviceUserLocal: UserLocalService,
    private readonly store$: Store<RootStoreState.State>
  ) {
    this.isAsync = false;
    this.query = { limit: 10, order: '', page: 1 };
  }

  getEstablishmentsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.getEstablishments),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectAuthUser)),
              (initial, user) => {
                return [user];
              }
            ),
            take(1)
          );
      }),
      switchMap(([user]: [UserLocal]) => {
        return this.serviceUserLocal.getEstablishments(user.id)
          .pipe(
            map((res: Array<LocalEstablishment>) => EstablishmentStoreActions.getEstablishmentsSuccess({ establishments: res })),
            catchError((error: VMError) => of(EstablishmentStoreActions.establishmentFailure({ data: error })))
          );
      })
    ));

  getEstablishmentsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.getEstablishmentsSuccess)
    ), { dispatch: false });

  getEstablishmentGeneralInformationEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.getEstablishmentGeneralInformation),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([establishment]: [LocalEstablishment]) => {
        return this.service.getInformation(establishment.id)
          .pipe(
            // tslint:disable-next-line: max-line-length
            map((res: LocalEstablishmentResponse) => EstablishmentStoreActions.getEstablishmentGeneralInformationSuccess({ establishment: res })),
            catchError((error: VMError) => of(EstablishmentStoreActions.establishmentFailure({ data: error })))
          );
      })
    ));

  getEstablishmentGeneralInformationSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.getEstablishmentGeneralInformationSuccess)
    ), { dispatch: false });

  createEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.createEstablishment),
      map((action: { newEstablishment: ILocalEstablishmentCreateRequest }) => action.newEstablishment),
      switchMap((payload: ILocalEstablishmentCreateRequest) => {
        return this.service.create({ ...payload })
          .pipe(
            map((establishment: LocalEstablishment) => EstablishmentStoreActions.createEstablishmentSuccess({ establishment })),
            catchError((error: VMError) => of(EstablishmentStoreActions.establishmentFailure({ data: error })))
          );
      })
    ));

  createSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.createEstablishmentSuccess),
      map((action: { establishment: LocalEstablishment }) => action.establishment),
      switchMap((establishment: LocalEstablishment) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishments)),
              (initial, establishments) => {
                return [establishment, establishments];
              }
            ),
            take(1)
          );
      }),
      switchMap(([establishment, establishments]: [LocalEstablishment, Array<LocalEstablishment>]) => {
        if (Array.isArray(establishments) && establishments.length === 1) {
          return of(EstablishmentStoreActions.setEstablishment({ establishment }));
        }

        return of(EstablishmentStoreActions.establishmentSuccess({ data: new VMSuccess({ message: 'SFRON_LOCES_001' }) }));
      })
    ));

  updateEstablishmentInformationEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.updateEstablishmentInformation),
      map((action: { newEstablishment: ILocalEstablishmentInformationForm }) => action.newEstablishment),
      switchMap((newEstablishment: ILocalEstablishmentInformationForm) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [newEstablishment, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([newEstablishment, establishment]: [ILocalEstablishmentInformationForm, LocalEstablishment]) => {
        return this.service.updateEstablishment(establishment.id, newEstablishment)
          .pipe(
            map((data: LocalEstablishment) => EstablishmentStoreActions.updateEstablishmentInformationSuccess({ establishment: data })),
            catchError((error: VMError) => of(EstablishmentStoreActions.establishmentFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentInformationEffectSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.updateEstablishmentInformationSuccess),
      switchMap(() => of(EstablishmentStoreActions.establishmentSuccess({ data: new VMSuccess({ message: 'SFRON_LOCES_002' }) })))
    ), { dispatch: false });

  updateEstablishmentStatusEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.updateEstablishmentStatus),
      map((action: { newStatus: IEstablishmentStatusEditRequest }) => action.newStatus),
      switchMap((newStatus: IEstablishmentStatusEditRequest) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [newStatus, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([newStatus, establishment]: [IEstablishmentStatusEditRequest, LocalEstablishment]) => {
        return this.service.updateEstablishmentStatus(establishment.id, newStatus)
          .pipe(
            map((data: LocalEstablishmentResponse) => EstablishmentStoreActions.updateEstablishmentStatusSuccess({ establishment: data })),
            catchError((error: VMError) => of(EstablishmentStoreActions.establishmentFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentStatusEffectSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.updateEstablishmentStatusSuccess),
      switchMap(() => of(EstablishmentStoreActions.establishmentSuccess({ data: new VMSuccess({ message: 'SFRON_LOCES_003' }) })))
    ), { dispatch: false });

  setEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.setEstablishment),
      map((action: { establishment: LocalEstablishment }) => action.establishment),
      tap((establishment: LocalEstablishment) => {
        localStorage.setItem('establishmentId', btoa(JSON.stringify(establishment.id)));
        this.store$.dispatch(getModulesEnabled());
        this.store$.dispatch(getEstablishmentCategories());
        this.store$.dispatch(getEstablishmentCurrencies());
        this.store$.dispatch(getEstablishmentCurrencyBase());
        this.store$.dispatch(getEstablishmentPaymentMethods());
        this.store$.dispatch(getEstablishmentStatusAppointments());
        this.store$.dispatch(clearQueryForGetSchedules());
        // Revisamos si es async (se debe pedir los items por el servidor cada vez)
        if (!this.isAsync) {
          this.store$.dispatch(getServicesAllOff({ query: { ...this.query } }));
          this.store$.dispatch(getProductsAllOff({ query: { ...this.query } }));
          this.store$.dispatch(getPromotionsAllOff({ query: { ...this.query } }));
          this.store$.dispatch(getUsersEstablishmentAllOff({ query: { ...this.query } }));
        }
      })
    ), { dispatch: false });

  openModalCreateEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.openModalCreate)
    ), { dispatch: false });

  closeModalCreateEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.closeModalCreate)
    ), { dispatch: false });

  openModalSelectEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.openModalSelect)
    ), { dispatch: false });

  closeModalSelectEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.closeModalSelect)
    ), { dispatch: false });

  clearEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.clearEstablishment),
      tap(() => {
        localStorage.removeItem('establishments');
        localStorage.removeItem('establishment');
      })
    ), { dispatch: false });

  clearEstablishmentGeneralInformationEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.clearEstablishmentGeneralInformation)
    ), { dispatch: false });

  establishmentFailureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.establishmentFailure),
      switchMap(() => of(EstablishmentStoreActions.errorToNull()))
    ));

  establishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.establishmentSuccess),
      switchMap(() => of(EstablishmentStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(EstablishmentStoreActions.successToNull)
    ), { dispatch: false });

}
