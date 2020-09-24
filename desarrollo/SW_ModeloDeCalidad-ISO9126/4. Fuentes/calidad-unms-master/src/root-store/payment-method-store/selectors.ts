import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PaymentMethod } from '@shared/models/payment-method/payment-method.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetPaymentMethods = (state: State): boolean => state.isLoadingGetPaymentMethods;

const getIsLoadingGetEstablishmentPaymentMethods = (state: State): boolean => state.isLoadingGetEstablishmentPaymentMethods;

const getIsLoadingUpdateEstablishmentPaymentMethods = (state: State): boolean => state.isLoadingUpdateEstablishmentPaymentMethods;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getPaymentMethods = (state: State): Array<PaymentMethod> | null => state.paymentMethods;

const getEstablishmentPaymentMethods = (state: State): Array<PaymentMethod> | null => state.establishmentPaymentMethods;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('payment-method');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetPaymentMethods: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetPaymentMethods
);

export const selectIsLoadingGetEstablishmentPaymentMethods: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetEstablishmentPaymentMethods
);

export const selectIsLoadingUpdateEstablishmentPaymentMethods: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateEstablishmentPaymentMethods
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectPaymentMethods: MemoizedSelector<object, Array<PaymentMethod> | null> = createSelector(
  selectState,
  getPaymentMethods
);

export const selectEstablishmentPaymentMethods: MemoizedSelector<object, Array<PaymentMethod> | null> = createSelector(
  selectState,
  getEstablishmentPaymentMethods
);
