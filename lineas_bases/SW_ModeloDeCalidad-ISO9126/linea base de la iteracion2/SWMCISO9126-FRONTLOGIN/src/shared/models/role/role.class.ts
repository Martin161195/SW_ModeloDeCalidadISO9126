import { Module } from '../module/module.class';
import { IModule } from '../module/module.interface';
import { IRole } from './role.interface';

export class Role {
  id: number;
  name: string;
  description: string;
  status: number;
  localId: number;
  createdAt: Date;
  updatedAt: Date;
  modules: Array<Module>;
  modulesId: Array<number>;
  statusRole: string;
  // tslint:disable-next-line: cyclomatic-complexity
  constructor(obj?: IRole) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.status = obj && obj.status || null;
    this.localId = obj && obj.localId || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.modules = obj && obj.modules && obj.modules.map((m: IModule) => new Module(m)) || null;
    this.modulesId = obj && obj.modulesId || null;
    this.statusRole = (this.status === 1) ? 'Activo' : `Inactivo`;
  }
}
