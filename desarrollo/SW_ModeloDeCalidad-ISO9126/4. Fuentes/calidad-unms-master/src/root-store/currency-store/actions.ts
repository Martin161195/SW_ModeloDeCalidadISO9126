import { createAction, props } from '@ngrx/store';
import { Currency } from '@shared/models/currency/currency.class';
import { ICurrencyUpdateBaseRequest, ICurrencyUpdateRequest } from '@shared/models/currency/currency.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETESTABLISHMENTCURRENCYBASE = '[CURRENCY] Get Establishment Currency Base',
  GETESTABLISHMENTCURRENCYBASESUCCESS = '[CURRENCY] Get Establishment Currency Base Success',
  GETCURRENCIESBYCURRENCY = '[CURRENCY] Get Currencies By Currency',
  GETCURRENCIESBYCURRENCYSUCCESS = '[CURRENCY] Get Currencies By Currency Success',
  GETESTABLISHMENTCURRENCIES = '[CURRENCY] Get Establishment Currencies',
  GETESTABLISHMENTCURRENCIESSUCCESS = '[CURRENCY] Get Establishment Currencies Success',
  UPDATEESTABLISHMENTCURRENCYBASE = '[CURRENCY] Update Establishment Currency Base',
  UPDATEESTABLISHMENTCURRENCYBASESUCCESS = '[CURRENCY] Update Establishment Currency Base Success',
  UPDATEESTABLISHMENTCURRENCIES = '[CURRENCY] Update Establishment Currencies',
  UPDATEESTABLISHMENTCURRENCIESSUCCESS = '[CURRENCY] Update Establishment Currencies Success',
  // Error global service
  CURRENCYSUCCESS = '[CURRENCY] Currency Success',
  CURRENCYFAILURE = '[CURRENCY] Currency Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[CURRENCY] Error To Null',
  SUCCESSTONULL = '[CURRENCY] Success To Null',
  // Clear state
  CLEARCURRENCY = '[CURRENCY] Clear Currency'
}

export const getEstablishmentCurrencyBase = createAction(
  ActionTypes.GETESTABLISHMENTCURRENCYBASE
);

export const getEstablishmentCurrencyBaseSuccess = createAction(
  ActionTypes.GETESTABLISHMENTCURRENCYBASESUCCESS,
  props<{ currency: Currency }>()
);

export const getCurrenciesByCurrency = createAction(
  ActionTypes.GETCURRENCIESBYCURRENCY,
  props<{ name: string }>()
);

export const getCurrenciesByCurrencySuccess = createAction(
  ActionTypes.GETCURRENCIESBYCURRENCYSUCCESS,
  props<{ currencies: Array<Currency> }>()
);

export const getEstablishmentCurrencies = createAction(
  ActionTypes.GETESTABLISHMENTCURRENCIES
);

export const getEstablishmentCurrenciesSuccess = createAction(
  ActionTypes.GETESTABLISHMENTCURRENCIESSUCCESS,
  props<{ currencies: Array<Currency> }>()
);

export const updateEstablishmentCurrencyBase = createAction(
  ActionTypes.UPDATEESTABLISHMENTCURRENCYBASE,
  props<{ data: ICurrencyUpdateBaseRequest }>()
);

export const updateEstablishmentCurrencyBaseSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTCURRENCYBASESUCCESS,
  props<{ currency: Currency }>()
);

export const updateEstablishmentCurrencies = createAction(
  ActionTypes.UPDATEESTABLISHMENTCURRENCIES,
  props<{ data: Array<ICurrencyUpdateRequest> }>()
);

export const updateEstablishmentCurrenciesSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTCURRENCIESSUCCESS,
  props<{ currencies: Array<Currency> }>()
);

export const currencySuccess = createAction(
  ActionTypes.CURRENCYSUCCESS,
  props<{ data: VMSuccess }>()
);

export const currencyFailure = createAction(
  ActionTypes.CURRENCYFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearCurrency = createAction(
  ActionTypes.CLEARCURRENCY
);
