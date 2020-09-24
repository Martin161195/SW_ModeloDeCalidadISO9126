export interface ISubcategory {
  id: number;
  name: string;
  username: string;
  description: string;
  images: Array<string>;
  status: number;
  categoryId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  localEstablishmentId?: number;
}

export interface ISubcategoryUpdateRequest {
  categoryId: number;
  subcategoryId: number;
  localEstablishmentId: number;
  status: number;
}
