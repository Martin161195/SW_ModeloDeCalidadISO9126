import { Subcategory } from '@shared/models/subcategory/subcategory.class';
import { ISubcategory } from '@shared/models/subcategory/subcategory.interface';
import { ICategory } from './category.interface';

export class Category {
  id: number;
  name: string;
  username: string;
  description: string;
  images: Array<string>;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  subcategories: Array<Subcategory>;
  localEstablishmentId: number;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: ICategory) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.description = obj && obj.description || null;
    this.images = obj && obj.images || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.subcategories = obj && obj.subcategories && obj.subcategories.map((obj1: ISubcategory) => new Subcategory(obj1)) || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
  }

  get active(): boolean {
    return this.status === 1;
  }
  set active(value: boolean) {
    this.status = value ? 1 : 2;
  }
}
