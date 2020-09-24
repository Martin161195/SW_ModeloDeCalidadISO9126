import { Module } from '@shared/models/module/module.class';

// tslint:disable-next-line: interface-name
export interface State {
  // modules
  modules: Array<Module> | null;
  // modules enabled by establishment
  modulesEnabled: Array<number> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Modules
  isLoadingGetModules: boolean;
  // load while send request for Get Modules Enabled
  isLoadingGetModulesEnabled: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  modules: null,
  modulesEnabled: null,
  error: null,
  success: null,
  isLoadingGetModules: false,
  isLoadingGetModulesEnabled: false,
  isLoadingGeneral: false
};
