import { ICurrency } from './currency.interface';

export class Currency {
  id: number;
  entity: string;
  entityCode: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
  symbol: string;
  isBaseCurrency: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  localEstablishmentId: number;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: ICurrency) {
    this.id = obj && obj.id || null;
    this.entity = obj && obj.entity || null;
    this.entityCode = obj && obj.entityCode || null;
    this.currency = obj && obj.currency || null;
    this.alphabeticCode = obj && obj.alphabeticCode || null;
    this.numericCode = obj && obj.numericCode || null;
    this.symbol = obj && obj.symbol || null;
    this.isBaseCurrency = obj && obj.isBaseCurrency || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
  }
}
