import { Action, createReducer, on } from '@ngrx/store';
import * as PaymentMethodStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(PaymentMethodStoreActions.getPaymentMethods, (state: State) => ({
    ...state,
    isLoadingGetPaymentMethods: true,
    isLoadingGeneral: true
  })),
  on(PaymentMethodStoreActions.getPaymentMethodsSuccess, (state: State, { paymentMethods }) => ({
    ...state,
    isLoadingGetPaymentMethods: false,
    isLoadingGeneral: false,
    paymentMethods
  })),
  on(PaymentMethodStoreActions.getEstablishmentPaymentMethods, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentPaymentMethods: true,
    isLoadingGeneral: true
  })),
  on(PaymentMethodStoreActions.getEstablishmentPaymentMethodsSuccess, (state: State, { paymentMethods }) => ({
    ...state,
    isLoadingGetEstablishmentPaymentMethods: false,
    isLoadingGeneral: false,
    establishmentPaymentMethods: paymentMethods
  })),
  on(PaymentMethodStoreActions.updateEstablishmentPaymentMethods, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentPaymentMethods: true,
    isLoadingGeneral: true
  })),
  on(PaymentMethodStoreActions.updateEstablishmentPaymentMethodsSuccess, (state: State, { paymentMethods }) => ({
    ...state,
    isLoadingUpdateEstablishmentPaymentMethods: false,
    isLoadingGeneral: false,
    establishmentPaymentMethods: paymentMethods
  })),
  on(PaymentMethodStoreActions.paymentMethodFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(PaymentMethodStoreActions.paymentMethodSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(PaymentMethodStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(PaymentMethodStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(PaymentMethodStoreActions.clearPaymentMethod, (state: State) => ({
    paymentMethods: null,
    establishmentPaymentMethods: null,
    error: null,
    success: null,
    isLoadingGetPaymentMethods: false,
    isLoadingGetEstablishmentPaymentMethods: false,
    isLoadingUpdateEstablishmentPaymentMethods: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function paymentMethodReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
