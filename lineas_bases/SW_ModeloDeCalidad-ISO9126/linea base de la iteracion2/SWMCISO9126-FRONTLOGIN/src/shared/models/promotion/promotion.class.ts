import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';
import { TypesOfPromotions } from '@settings/constants/form/types-of-promotions';
import { IPromotion, IPromotionWithPagination } from './promotion.interface';

export class Promotion {
  id: number;
  code: string;
  quantity: number;
  kind: string;
  discountPercent: number;
  discountPrice: number;
  symbol: string;
  minimalPurchase: number;
  dateEnd: Date;
  email: string;
  verifyUserId: number;
  localId: number;
  localEstablishmentId: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  showKind: string;
  showDiscount: string;
  showMinimalPurchase: string;
  statusPromotion: string;

  // tslint:disable-next-line: cyclomatic-complexity
  constructor(obj?: IPromotion) {
    this.id = obj && obj.id || null;
    this.code = obj && obj.code || null;
    this.quantity = obj && obj.quantity || null;
    this.kind = obj && obj.kind || null;
    this.discountPercent = obj && obj.discountPercent || null;
    this.discountPrice = obj && obj.discountPrice || null;
    this.symbol = obj && obj.symbol || null;
    this.minimalPurchase = obj && obj.minimalPurchase || null;
    this.dateEnd = obj && obj.dateEnd && new Date(obj.dateEnd) || null;
    this.email = obj && obj.email || null;
    this.verifyUserId = obj && obj.verifyUserId || null;
    this.localId = obj && obj.localId || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.showKind = !!this.kind ? TypesOfPromotions.filter((obj1: SelectListItem) => obj1.value === this.kind)[0].text : null;
    this.showDiscount = this.discountPercent !== null
      ? `${this.discountPercent.toFixed(2)} %`
      : this.discountPrice !== null
        ? `${this.symbol} ${this.discountPrice.toFixed(2)}` : 'Sin descuento';
    this.showMinimalPurchase = !!this.minimalPurchase ? `${this.symbol} ${this.minimalPurchase.toFixed(2)}` : 'Sin compra mínima';
    this.statusPromotion = (this.status === 1) ? 'Activo' : `Inactivo`;
  }
}

export class PromotionWithPagination {
  data: Array<Promotion>;
  page: number;
  perPage: number;
  totalRecords: number;
  constructor(obj?: IPromotionWithPagination) {
    this.data = obj && obj.data && obj.data.map((obj1: IPromotion) => new Promotion(obj1)) || null;
    this.page = obj && obj.page || null;
    this.perPage = obj && obj.perPage || null;
    this.totalRecords = obj && obj.totalRecords || null;
  }
}
