import { ISubcategory, ISubcategoryUpdateRequest } from '../subcategory/subcategory.interface';

export interface ICategory {
  id: number;
  name: string;
  username: string;
  description: string;
  images: Array<string>;
  status: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  subcategories: Array<ISubcategory>;
  localEstablishmentId?: number;
}

export interface ICategoryUpdateRequest {
  categoryId: number;
  localEstablishmentId: number;
  subcategories: Array<ISubcategoryUpdateRequest>;
  status: number;
}
