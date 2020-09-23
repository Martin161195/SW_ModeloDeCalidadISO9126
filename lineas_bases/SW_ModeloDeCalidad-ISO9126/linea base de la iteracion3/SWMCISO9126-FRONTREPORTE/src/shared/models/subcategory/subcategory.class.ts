import { ISubcategory } from './subcategory.interface';

export class Subcategory {
  id: number;
  name: string;
  username: string;
  description: string;
  images: Array<string>;
  status: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  localEstablishmentId: number;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: ISubcategory) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.description = obj && obj.description || null;
    this.images = obj && obj.images || null;
    this.status = obj && obj.status || null;
    this.categoryId = obj && obj.categoryId || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
  }

  get active(): boolean {
    return this.status === 1;
  }
  set active(value: boolean) {
    this.status = value ? 1 : 2;
  }
}
