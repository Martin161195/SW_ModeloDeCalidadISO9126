import { IModule } from '../module/module.interface';

export interface IRole {
  id: number;
  name: string;
  description: string;
  status: number;
  localId: number;
  createdAt: string;
  updatedAt: string;
  modules: Array<IModule>;
  modulesId: Array<number>;
}

export interface IRoleCreateRequestOrEdit {
  name: string;
  description: string;
  status: number;
  modulesId: Array<number>;
}
