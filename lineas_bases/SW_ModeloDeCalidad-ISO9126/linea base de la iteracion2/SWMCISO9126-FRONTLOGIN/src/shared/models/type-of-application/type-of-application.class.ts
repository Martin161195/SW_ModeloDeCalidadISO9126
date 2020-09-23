import { ITypeOfApplication } from './type-of-application.interface';

export class TypeOfApplication {
  id: number;
  name: string;
  description: string;
  code: string;
  enabled: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: ITypeOfApplication) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.code = obj && obj.code || null;
    this.enabled = obj && obj.enabled || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
  }
}
