import { createAction, props } from '@ngrx/store';
import { Module } from '@shared/models/module/module.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETMODULES = '[MODULE] Get Modules',
  GETMODULESSUCCESS = '[MODULE] Get Modules Success',
  GETMODULESENABLED = '[MODULE] Get Modules Enabled',
  GETMODULESENABLEDSUCCESS = '[MODULE] Get Modules Enabled Success',
  // Error global service
  MODULESUCCESS = '[MODULE] Module Success',
  MODULEFAILURE = '[MODULE] Module Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[MODULE] Error To Null',
  SUCCESSTONULL = '[MODULE] Success To Null',
  // Clear state
  CLEARMODULE = '[MODULE] Clear Module'
}

export const getModules = createAction(
  ActionTypes.GETMODULES
);

export const getModulesSuccess = createAction(
  ActionTypes.GETMODULESSUCCESS,
  props<{ modules: Array<Module> }>()
);

export const getModulesEnabled = createAction(
  ActionTypes.GETMODULESENABLED
);

export const getModulesEnabledSuccess = createAction(
  ActionTypes.GETMODULESENABLEDSUCCESS,
  props<{ modulesId: Array<number> }>()
);

export const moduleSuccess = createAction(
  ActionTypes.MODULESUCCESS,
  props<{ data: VMSuccess }>()
);

export const moduleFailure = createAction(
  ActionTypes.MODULEFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearModule = createAction(
  ActionTypes.CLEARMODULE
);
