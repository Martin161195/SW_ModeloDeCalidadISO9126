import { IOcuppation } from './ocuppation.interface';

export class Ocuppation {
  id: number;
  name: string;
  username: string;
  images: Array<string>;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(obj?: IOcuppation) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.images = obj && obj.images || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
  }
}
