import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Module } from '@shared/models/module/module.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetModules = (state: State): boolean => state.isLoadingGetModules;

const getIsLoadingGetModulesEnabled = (state: State): boolean => state.isLoadingGetModulesEnabled;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getModules = (state: State): Array<Module> | null => state.modules;

const getModulesEnabled = (state: State): Array<number> | null => state.modulesEnabled;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('module');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetModules: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetModules
);

export const selectIsLoadingGetModulesEnabled: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetModulesEnabled
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectModules: MemoizedSelector<object, Array<Module> | null> = createSelector(
  selectState,
  getModules
);

export const selectModulesEnabled: MemoizedSelector<object, Array<number> | null> = createSelector(
  selectState,
  getModulesEnabled
);
