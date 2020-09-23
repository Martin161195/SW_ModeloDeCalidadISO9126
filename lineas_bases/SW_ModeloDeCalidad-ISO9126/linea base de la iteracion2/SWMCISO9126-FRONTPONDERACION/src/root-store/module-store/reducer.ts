import { Action, createReducer, on } from '@ngrx/store';
import * as ModuleStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(ModuleStoreActions.getModules, (state: State) => ({
    ...state,
    isLoadingGetModules: true,
    isLoadingGeneral: true
  })),
  on(ModuleStoreActions.getModulesSuccess, (state: State, { modules }) => ({
    ...state,
    isLoadingGetModules: false,
    isLoadingGeneral: false,
    modules
  })),
  on(ModuleStoreActions.getModulesEnabled, (state: State) => ({
    ...state,
    isLoadingGetModulesEnabled: true,
    isLoadingGeneral: true
  })),
  on(ModuleStoreActions.getModulesEnabledSuccess, (state: State, { modulesId }) => ({
    ...state,
    isLoadingGetModulesEnabled: false,
    isLoadingGeneral: false,
    modulesEnabled: modulesId
  })),
  on(ModuleStoreActions.moduleFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(ModuleStoreActions.moduleSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(ModuleStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(ModuleStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(ModuleStoreActions.clearModule, (state: State) => ({
    modules: null,
    modulesEnabled: null,
    error: null,
    success: null,
    isLoadingGetModules: false,
    isLoadingGetModulesEnabled: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function moduleReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
