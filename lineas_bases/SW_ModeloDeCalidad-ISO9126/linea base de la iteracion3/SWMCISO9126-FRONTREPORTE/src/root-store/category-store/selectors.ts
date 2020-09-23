import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Category } from '@shared/models/category/category.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetCategories = (state: State): boolean => state.isLoadingGetCategories;

const getIsLoadingGetEstablishmentCategories = (state: State): boolean => state.isLoadingGetEstablishmentCategories;

const getIsLoadingUpdateEstablishmentCategories = (state: State): boolean => state.isLoadingUpdateEstablishmentCategories;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getCategories = (state: State): Array<Category> | null => state.categories;

const getEstablishmentCategories = (state: State): Array<Category> | null => state.establishmentCategories;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('category');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetCategories: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetCategories
);

export const selectIsLoadingGetEstablishmentCategories: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetEstablishmentCategories
);

export const selectIsLoadingUpdateEstablishmentCategories: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateEstablishmentCategories
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectCategories: MemoizedSelector<object, Array<Category> | null> = createSelector(
  selectState,
  getCategories
);

export const selectEstablishmentCategories: MemoizedSelector<object, Array<Category> | null> = createSelector(
  selectState,
  getEstablishmentCategories
);
