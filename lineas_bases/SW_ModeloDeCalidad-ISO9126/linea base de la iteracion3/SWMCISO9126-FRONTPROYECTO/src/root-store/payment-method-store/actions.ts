import { createAction, props } from '@ngrx/store';
import { PaymentMethod } from '@shared/models/payment-method/payment-method.class';
import { IPaymentMethodUpdateRequest } from '@shared/models/payment-method/payment-method.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETPAYMENTMETHODS = '[PAYMENTMETHOD] Get Payment Methods',
  GETPAYMENTMETHODSSUCCESS = '[PAYMENTMETHOD] Get Payment Methods Success',
  GETESTABLISHMENTPAYMENTMETHODS = '[PAYMENTMETHOD] Get Establishment Payment Methods',
  GETESTABLISHMENTPAYMENTMETHODSSUCCESS = '[PAYMENTMETHOD] Get Establishment Payment Methods Success',
  UPDATEESTABLISHMENTPAYMENTMETHODS = '[PAYMENTMETHOD] Update Establishment Payment Methods',
  UPDATEESTABLISHMENTPAYMENTMETHODSSUCCESS = '[PAYMENTMETHOD] Update Establishment Payment Methods Success',
  // Error global service
  PAYMENTMETHODSUCCESS = '[PAYMENTMETHOD] Payment Method Success',
  PAYMENTMETHODFAILURE = '[PAYMENTMETHOD] Payment Method Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[PAYMENTMETHOD] Error To Null',
  SUCCESSTONULL = '[PAYMENTMETHOD] Success To Null',
  // Clear state
  CLEARPAYMENTMETHOD = '[PAYMENTMETHOD] Clear Payment Method'
}

export const getPaymentMethods = createAction(
  ActionTypes.GETPAYMENTMETHODS
);

export const getPaymentMethodsSuccess = createAction(
  ActionTypes.GETPAYMENTMETHODSSUCCESS,
  props<{ paymentMethods: Array<PaymentMethod> }>()
);

export const getEstablishmentPaymentMethods = createAction(
  ActionTypes.GETESTABLISHMENTPAYMENTMETHODS
);

export const getEstablishmentPaymentMethodsSuccess = createAction(
  ActionTypes.GETESTABLISHMENTPAYMENTMETHODSSUCCESS,
  props<{ paymentMethods: Array<PaymentMethod> }>()
);

export const updateEstablishmentPaymentMethods = createAction(
  ActionTypes.UPDATEESTABLISHMENTPAYMENTMETHODS,
  props<{ newPaymentMethods: Array<IPaymentMethodUpdateRequest> }>()
);

export const updateEstablishmentPaymentMethodsSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTPAYMENTMETHODSSUCCESS,
  props<{ paymentMethods: Array<PaymentMethod> }>()
);

export const paymentMethodSuccess = createAction(
  ActionTypes.PAYMENTMETHODSUCCESS,
  props<{ data: VMSuccess }>()
);

export const paymentMethodFailure = createAction(
  ActionTypes.PAYMENTMETHODFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearPaymentMethod = createAction(
  ActionTypes.CLEARPAYMENTMETHOD
);
