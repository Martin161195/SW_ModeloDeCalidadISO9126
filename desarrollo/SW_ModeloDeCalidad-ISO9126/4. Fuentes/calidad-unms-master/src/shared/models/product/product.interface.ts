import { ISubcategory } from '@shared/models/subcategory/subcategory.interface';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  quantity: number;
  pricePromo: number;
  price: number;
  symbol: string;
  images: Array<string>;
  status: number;
  localEstablishmentId: number;
  createdAt: string;
  updatedAt: string;
  subcategories: Array<ISubcategory>;
}

export interface IProductCreateVoucher {
  product: {
    id: number;
    name: string;
    description: string;
    discount: number;
    total: number;
    isNewDiscount: boolean;
    pricePromo: number;
    price: number;
    symbol: string;
    images: Array<string>;
    status: number;
    localEstablishmentId: number;
    createdAt: string;
    updatedAt: string;
  };
  quantity: number;
  total: number;
  sourceCurrencyId: number;
}

export interface IProductVoucher extends IProductCreateVoucher {
  id: number;
  localEstablishmentId: number;
  userAppId: number;
  voucherId: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  userApp?: any;
}

export interface IProductCreateRequestOrEdit {
  name: string;
  description: number;
  quantity: number;
  pricePromo: number;
  price: number;
  images: Array<string>;
  subcategoriesId: Array<number>;
  status?: number;
}

export interface IProductWithPagination {
  data: Array<IProduct>;
  page: number;
  perPage: number;
  totalRecords: number;
}
