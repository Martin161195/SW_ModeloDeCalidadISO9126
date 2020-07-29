export interface IPromotion {
  id: number;
  code: string;
  quantity?: number;
  kind: string;
  discountPercent?: number;
  discountPrice?: number;
  symbol?: string;
  minimalPurchase?: number;
  dateEnd?: string;
  email?: string;
  verifyUserId?: number;
  localId?: number;
  localEstablishmentId?: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPromotionCreate {
  code?: string;
  quantity?: number;
  kind: string;
  discountPercent?: number;
  discountPrice?: number;
  minimalPurchase?: number;
  dateEnd?: string;
  verifyUserId?: number;
}

export interface IPromotionEdit {
  code: string;
  quantity: number;
  kind: string;
  discountPercent: number;
  discountPrice: number;
  minimalPurchase: number;
  dateEnd: string;
  verifyUserId: number;
  status: number;
}

export interface IPromotionWithPagination {
  data: Array<IPromotion>;
  page: number;
  perPage: number;
  totalRecords: number;
}

export interface IUserPromotionByCode {
  userAppId: number;
  code: string;
}
