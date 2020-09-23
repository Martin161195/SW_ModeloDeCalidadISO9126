import { PaymentMethod } from '@shared/models/payment-method/payment-method.class';

// tslint:disable-next-line: interface-name
export interface State {
  // paymentMethods
  paymentMethods: Array<PaymentMethod> | null;
  // paymentMethods by Establishment
  establishmentPaymentMethods: Array<PaymentMethod> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Payment Methods
  isLoadingGetPaymentMethods: boolean;
  // load while send request for Get Establishment Payment Methods
  isLoadingGetEstablishmentPaymentMethods: boolean;
  // load while send request for Update Establishment Payment Methods
  isLoadingUpdateEstablishmentPaymentMethods: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  paymentMethods: null,
  establishmentPaymentMethods: null,
  error: null,
  success: null,
  isLoadingGetPaymentMethods: false,
  isLoadingGetEstablishmentPaymentMethods: false,
  isLoadingUpdateEstablishmentPaymentMethods: false,
  isLoadingGeneral: false
};
