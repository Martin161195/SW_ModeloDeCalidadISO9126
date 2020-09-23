import { IModule } from './module.interface';

export class Module {
  id: number;
  code: string;
  name: string;
  description: string;
  route: string;
  icon: Array<string>;
  status: number;
  plans: Array<string>;
  moduleId: number | null;
  createdAt: Date;
  updatedAt: Date;
  modules: Array<Module> | null;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IModule) {
    this.id = obj && obj.id || null;
    this.code = obj && obj.code || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.route = obj && obj.route || null;
    this.icon = obj && obj.icon || null;
    this.status = obj && obj.status || null;
    this.plans = obj && obj.plans || null;
    this.moduleId = obj && obj.moduleId || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.modules = obj && obj.modules && obj.modules.map((m: IModule) => new Module(m)) || null;
  }
}
