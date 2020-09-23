import { Action, createReducer, on } from '@ngrx/store';
import * as CategoryStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(CategoryStoreActions.getCategories, (state: State) => ({
    ...state,
    isLoadingGetCategories: true,
    isLoadingGeneral: true
  })),
  on(CategoryStoreActions.getCategoriesSuccess, (state: State, { categories }) => ({
    ...state,
    isLoadingGetCategories: false,
    isLoadingGeneral: false,
    categories
  })),
  on(CategoryStoreActions.getEstablishmentCategories, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentCategories: true,
    isLoadingGeneral: true
  })),
  on(CategoryStoreActions.getEstablishmentCategoriesSuccess, (state: State, { categories }) => ({
    ...state,
    isLoadingGetEstablishmentCategories: false,
    isLoadingGeneral: false,
    establishmentCategories: categories
  })),
  on(CategoryStoreActions.updateEstablishmentCategories, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentCategories: true,
    isLoadingGeneral: true
  })),
  on(CategoryStoreActions.updateEstablishmentCategoriesSuccess, (state: State, { categories }) => ({
    ...state,
    isLoadingUpdateEstablishmentCategories: false,
    isLoadingGeneral: false,
    establishmentCategories: categories
  })),
  on(CategoryStoreActions.categoryFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(CategoryStoreActions.categorySuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(CategoryStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(CategoryStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(CategoryStoreActions.clearCategory, (state: State) => ({
    categories: null,
    establishmentCategories: null,
    error: null,
    success: null,
    isLoadingGetCategories: false,
    isLoadingGetEstablishmentCategories: false,
    isLoadingUpdateEstablishmentCategories: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function categoryReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
