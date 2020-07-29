import { Currency } from '@shared/models/currency/currency.class';

// tslint:disable-next-line: interface-name
export interface State {
  // establishment currency base for establishment
  establishmentCurrencyBase: Currency | null;
  // currencies
  currenciesByCurrency: Array<Currency> | null;
  // currencies
  establishmentCurrencies: Array<Currency> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Currency Base
  isLoadingGetEstablishmentCurrencyBase: boolean;
  // load while send request for Get Currencies by Currency
  isLoadingGetCurrenciesByCurrency: boolean;
  // load while send request for Get Establishment Currencies
  isLoadingGetEstablishmentCurrencies: boolean;
  // load while send request for Update Currency Base for Establishment
  isLoadingUpdateEstablishmentCurrencyBase: boolean;
  // load while send request for Update Establishment Currencies
  isLoadingUpdateEstablishmentCurrencies: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
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
};
