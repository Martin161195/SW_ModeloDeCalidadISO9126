export interface ICurrency {
  id: number;
  entity: string;
  entityCode: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
  symbol: string;
  isBaseCurrency: number;
  status: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  localEstablishmentId?: number;
}

export interface ICurrencyUpdateRequest {
  currencyId: number;
  localEstablishmentId: number;
  status: number;
}

export interface ICurrencyUpdateBaseRequest {
  currencyId: number;
}
