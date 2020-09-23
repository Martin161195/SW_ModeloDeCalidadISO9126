import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { PaymentMethodService } from '@providers/services/payment-method/payment-method.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { PaymentMethod } from '@shared/models/payment-method/payment-method.class';
import { IPaymentMethodUpdateRequest } from '@shared/models/payment-method/payment-method.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as PaymentMethodStoreActions from './actions';

@Injectable()
export class PaymentMethodStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly servicePaymentMethod: PaymentMethodService,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getPaymentMethodsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.getPaymentMethods),
      switchMap(() => {
        return this.servicePaymentMethod.get()
          .pipe(
            map((value: Array<PaymentMethod>) => PaymentMethodStoreActions.getPaymentMethodsSuccess({ paymentMethods: value })),
            catchError((error: VMError) => of(PaymentMethodStoreActions.paymentMethodFailure({ data: error })))
          );
      })
    ));

  getPaymentMethodsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.getPaymentMethodsSuccess)
    ), { dispatch: false });

  getEstablishmentPaymentMethodsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.getEstablishmentPaymentMethods),
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
      switchMap(([establishment]) => {
        return this.serviceLocalEstablishment.getPaymentMethods(establishment.id)
          .pipe(
            // tslint:disable-next-line: max-line-length
            map((value: Array<PaymentMethod>) => PaymentMethodStoreActions.getEstablishmentPaymentMethodsSuccess({ paymentMethods: value })),
            catchError((error: VMError) => of(PaymentMethodStoreActions.paymentMethodFailure({ data: error })))
          );
      })
    ));

  GetEstablishmentPaymentMethodsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.getEstablishmentPaymentMethodsSuccess)
    ), { dispatch: false });

  updateEstablishmentPaymentMethodsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.updateEstablishmentPaymentMethods),
      map((action: { newPaymentMethods: Array<IPaymentMethodUpdateRequest> }) => action.newPaymentMethods),
      switchMap((paymentMethods: Array<IPaymentMethodUpdateRequest>) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [paymentMethods, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([paymentMethods, establishment]: [Array<IPaymentMethodUpdateRequest>, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.updatePaymentMethods(establishment.id, paymentMethods)
          .pipe(
            // tslint:disable-next-line: max-line-length
            map((value: Array<PaymentMethod>) => PaymentMethodStoreActions.updateEstablishmentPaymentMethodsSuccess({ paymentMethods: value })),
            catchError((error: VMError) => of(PaymentMethodStoreActions.paymentMethodFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentPaymentMethodsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.updateEstablishmentPaymentMethodsSuccess),
      switchMap(() => of(PaymentMethodStoreActions.paymentMethodSuccess({ data: new VMSuccess({ message: 'SFRON_LEPM_001' }) })))
    ));

  paymentMethodFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.paymentMethodFailure),
      switchMap(() => of(PaymentMethodStoreActions.errorToNull()))
    ));

  paymentMethodSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.paymentMethodSuccess),
      switchMap(() => of(PaymentMethodStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.successToNull)
    ), { dispatch: false });

  clearpaymentMethodEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaymentMethodStoreActions.clearPaymentMethod)
    ), { dispatch: false });

}
