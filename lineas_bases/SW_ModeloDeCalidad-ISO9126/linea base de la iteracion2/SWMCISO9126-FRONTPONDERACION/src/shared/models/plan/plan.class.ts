import { IPlan } from './plan.interface';

export class Plan {
  code: string;
  name: string;
  description: string;
  isTrial?: number;
  trial?: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(obj?: IPlan) {
    this.code = obj && obj.code || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.isTrial = obj && obj.isTrial || null;
    this.trial = obj && obj.trial || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
  }
}
