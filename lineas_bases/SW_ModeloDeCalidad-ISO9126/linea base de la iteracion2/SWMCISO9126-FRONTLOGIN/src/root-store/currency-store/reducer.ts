import { Action, createReducer, on } from '@ngrx/store';
import * as CurrencyStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(CurrencyStoreActions.getEstablishmentCurrencyBase, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentCurrencyBase: true,
    isLoadingGeneral: true
  })),
  on(CurrencyStoreActions.getEstablishmentCurrencyBaseSuccess, (state: State, { currency }) => ({
    ...state,
    isLoadingGetEstablishmentCurrencyBase: false,
    isLoadingGeneral: false,
    establishmentCurrencyBase: currency
  })),
  on(CurrencyStoreActions.getCurrenciesByCurrency, (state: State) => ({
    ...state,
    isLoadingGetCurrenciesByCurrency: true,
    isLoadingGeneral: true
  })),
  on(CurrencyStoreActions.getCurrenciesByCurrencySuccess, (state: State, { currencies }) => ({
    ...state,
    isLoadingGetCurrenciesByCurrency: false,
    isLoadingGeneral: false,
    currenciesByCurrency: currencies
  })),
  on(CurrencyStoreActions.getEstablishmentCurrencies, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentCurrencies: true,
    isLoadingGeneral: true
  })),
  on(CurrencyStoreActions.getEstablishmentCurrenciesSuccess, (state: State, { currencies }) => ({
    ...state,
    isLoadingGetEstablishmentCurrencies: false,
    isLoadingGeneral: false,
    establishmentCurrencies: currencies
  })),
  on(CurrencyStoreActions.updateEstablishmentCurrencyBase, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentCurrencyBase: true,
    isLoadingGeneral: true
  })),
  on(CurrencyStoreActions.updateEstablishmentCurrencyBaseSuccess, (state: State, { currency }) => ({
    ...state,
    isLoadingUpdateEstablishmentCurrencyBase: false,
    isLoadingGeneral: false,
    establishmentCurrencyBase: currency
  })),
  on(CurrencyStoreActions.updateEstablishmentCurrencies, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentCurrencies: true,
    isLoadingGeneral: true
  })),
  on(CurrencyStoreActions.updateEstablishmentCurrenciesSuccess, (state: State, { currencies }) => ({
    ...state,
    isLoadingUpdateEstablishmentCurrencies: false,
    isLoadingGeneral: false,
    establishmentCurrencies: currencies
  })),
  on(CurrencyStoreActions.currencyFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(CurrencyStoreActions.currencySuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(CurrencyStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(CurrencyStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(CurrencyStoreActions.clearCurrency, (state: State) => ({
    establishmentCurrencyBase: null,
    currenciesByCurrency: null,
    establishmentCurrencies: null,
    error: null,
    success: null,
    isLoadingGetEstablishmentCurrencyBase: false,
    isLoadingGetCurrenciesByCurrency: false,
    isLoadingGetEstablishmentCurrencies: false,
    isLoadingUpdateEstablishmentCurrencyBase: false,
    isLoadingUpdateEstablishmentCurrencies: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function currencyReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
