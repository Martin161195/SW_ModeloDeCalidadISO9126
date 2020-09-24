import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Currency } from '@shared/models/currency/currency.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetEstablishmentCurrencyBase = (state: State): boolean => state.isLoadingGetEstablishmentCurrencyBase;

const getIsLoadingGetCurrenciesByCurrency = (state: State): boolean => state.isLoadingGetCurrenciesByCurrency;

const getIsLoadingGetEstablishmentCurrencies = (state: State): boolean => state.isLoadingGetEstablishmentCurrencies;

const getIsLoadingUpdateEstablishmentCurrencyBase = (state: State): boolean => state.isLoadingUpdateEstablishmentCurrencyBase;

const getIsLoadingUpdateEstablishmentCurrencies = (state: State): boolean => state.isLoadingUpdateEstablishmentCurrencies;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getEstablishmentCurrencyBase = (state: State): Currency | null => state.establishmentCurrencyBase;

const getCurrenciesByCurrency = (state: State): Array<Currency> | null => state.currenciesByCurrency;

const getEstablishmentCurrencies = (state: State): Array<Currency> | null => state.establishmentCurrencies;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('currency');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetEstablishmentCurrencyBase: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetEstablishmentCurrencyBase
);

export const selectIsLoadingGetCurrenciesByCurrency: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetCurrenciesByCurrency
);

export const selectIsLoadingGetEstablishmentCurrencies: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetEstablishmentCurrencies
);

export const selectIsLoadingUpdateEstablishmentCurrencyBase: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateEstablishmentCurrencyBase
);

export const selectIsLoadingUpdateEstablishmentCurrencies: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateEstablishmentCurrencies
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectEstablishmentCurrencyBase: MemoizedSelector<object, Currency | null> = createSelector(
  selectState,
  getEstablishmentCurrencyBase
);

export const selectCurrenciesByCurrency: MemoizedSelector<object, Array<Currency> | null> = createSelector(
  selectState,
  getCurrenciesByCurrency
);

export const selectEstablishmentCurrencies: MemoizedSelector<object, Array<Currency> | null> = createSelector(
  selectState,
  getEstablishmentCurrencies
);
