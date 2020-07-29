export interface IModule {
  id: number;
  code: string;
  name: string;
  description: string;
  route: string;
  icon: Array<string>;
  status: number;
  plans: Array<string>;
  moduleId: number | null;
  createdAt: string;
  updatedAt: string;
  modules: Array<IModule> | null;
}
