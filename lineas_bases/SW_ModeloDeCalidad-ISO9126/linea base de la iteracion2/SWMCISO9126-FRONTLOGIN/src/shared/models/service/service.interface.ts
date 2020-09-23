import { ISubcategory } from '@shared/models/subcategory/subcategory.interface';
import { IUserEstablishment } from '../user-establishment/user-establishment.interface';

export interface IService {
  id: number;
  name: string;
  description: string;
  pricePromo: number;
  price: number;
  symbol: string;
  duration: number;
  images: Array<string>;
  status: number;
  localEstablishmentId: number;
  createdAt: string;
  updatedAt: string;
  subcategories: Array<ISubcategory>;
  usersEstablishment: Array<IUserEstablishment>;
}

export interface IServiceCreateVoucher {
  id: number;
  name: string;
  description: string;
  discount: number;
  total: number;
  isNewDiscount: boolean;
  pricePromo: number;
  price: number;
  symbol: string;
  duration: number;
  images: Array<string>;
  status: number;
  localEstablishmentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IServiceCreateRequestOrEdit {
  name: string;
  description: number;
  pricePromo: number;
  price: number;
  duration: number;
  images: Array<string>;
  subcategoriesId: Array<number>;
  usersEstablishmentId: Array<number>;
  status?: number;
}

export interface IServiceWithPagination {
  data: Array<IService>;
  page: number;
  perPage: number;
  totalRecords: number;
}
