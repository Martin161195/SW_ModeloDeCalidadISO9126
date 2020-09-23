import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { CurrencyService } from '@providers/services/currency/currency.service';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { Currency } from '@shared/models/currency/currency.class';
import { ICurrencyUpdateBaseRequest, ICurrencyUpdateRequest } from '@shared/models/currency/currency.interface';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import * as CurrencyStoreActions from './actions';

@Injectable()
export class CurrencyStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceCurrency: CurrencyService,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getEstablishmentCurrencyBaseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.getEstablishmentCurrencyBase),
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
        return this.serviceLocalEstablishment.getCurrencyBase(establishment.id)
          .pipe(
            map((value: Currency) => CurrencyStoreActions.getEstablishmentCurrencyBaseSuccess({ currency: value })),
            catchError((error: VMError) => of(CurrencyStoreActions.currencyFailure({ data: error })))
          );
      })
    ));

  getEstablishmentCurrencyBaseSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.getEstablishmentCurrencyBaseSuccess)
    ), { dispatch: false });

  getCurrenciesByCurrencyEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.getCurrenciesByCurrency),
      map((action: { name: string }) => action.name),
      debounceTime(250),
      switchMap((search: string) => {
        return this.serviceCurrency.getByCurrency(search)
          .pipe(
            map((value: Array<Currency>) => CurrencyStoreActions.getCurrenciesByCurrencySuccess({ currencies: value })),
            catchError((error: VMError) => of(CurrencyStoreActions.currencyFailure({ data: error })))
          );
      })
    ));

  getCurrenciesByCurrencySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.getCurrenciesByCurrencySuccess)
    ), { dispatch: false });

  getEstablishmentCurrenciesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.getEstablishmentCurrencies),
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
        return this.serviceLocalEstablishment.getCurrencies(establishment.id)
          .pipe(
            map((value: Array<Currency>) => CurrencyStoreActions.getEstablishmentCurrenciesSuccess({ currencies: value })),
            catchError((error: VMError) => of(CurrencyStoreActions.currencyFailure({ data: error })))
          );
      })
    ));

  getEstablishmentCurrenciesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.getEstablishmentCurrenciesSuccess)
    ), { dispatch: false });

  updateEstablishmentCurrencyBaseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.updateEstablishmentCurrencyBase),
      map((action: { data: ICurrencyUpdateBaseRequest }) => action.data),
      switchMap((data: ICurrencyUpdateBaseRequest) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [data, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([data, establishment]: [ICurrencyUpdateBaseRequest, LocalEstablishment]) => {
        // tslint:disable-next-line:max-line-length
        return this.serviceLocalEstablishment.updateCurrencyBase(establishment.id, data.currencyId)
          .pipe(
            map((value: Currency) => CurrencyStoreActions.updateEstablishmentCurrencyBaseSuccess({ currency: value })),
            catchError((error: VMError) => of(CurrencyStoreActions.currencyFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentCurrencyBaseSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.updateEstablishmentCurrencyBaseSuccess),
      switchMap(() => of(CurrencyStoreActions.currencySuccess({ data: new VMSuccess({ message: 'SFRON_LECURR_002' }) })))
    ));

  updateEstablishmentCurrenciesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.updateEstablishmentCurrencies),
      map((action: { data: Array<ICurrencyUpdateRequest> }) => action.data),
      switchMap((currencies: Array<ICurrencyUpdateRequest>) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [currencies, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([currencies, establishment]: [Array<ICurrencyUpdateRequest>, LocalEstablishment]) => {
        // tslint:disable-next-line:max-line-length
        return this.serviceLocalEstablishment.updateCurrencies(establishment.id, currencies)
          .pipe(
            map((value: Array<Currency>) => CurrencyStoreActions.updateEstablishmentCurrenciesSuccess({ currencies: value })),
            catchError((error: VMError) => of(CurrencyStoreActions.currencyFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentCurrenciesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.updateEstablishmentCurrenciesSuccess),
      tap(() => {
        this.store$.dispatch(CurrencyStoreActions.getEstablishmentCurrencyBase());
      }),
      switchMap(() => of(CurrencyStoreActions.currencySuccess({ data: new VMSuccess({ message: 'SFRON_LECURR_001' }) })))
    ));

  currencyFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.currencyFailure),
      switchMap(() => of(CurrencyStoreActions.errorToNull()))
    ));

  currencySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.currencySuccess),
      switchMap(() => of(CurrencyStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.successToNull)
    ), { dispatch: false });

  clearCurrencyEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CurrencyStoreActions.currencySuccess)
    ), { dispatch: false });

}
