import { createAction, props } from '@ngrx/store';
import { Category } from '@shared/models/category/category.class';
import { ICategoryUpdateRequest } from '@shared/models/category/category.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETCATEGORIES = '[CATEGORY] Get Categories',
  GETCATEGORIESSUCCESS = '[CATEGORY] Get Categories Success',
  GETESTABLISHMENTCATEGORIES = '[CATEGORY] Get Establishment Categories',
  GETESTABLISHMENTCATEGORIESSUCCESS = '[CATEGORY] Get Establishment Categories Success',
  UPDATEESTABLISHMENTCATEGORIES = '[CATEGORY] Update Establishment Categories',
  UPDATEESTABLISHMENTCATEGORIESSUCCESS = '[CATEGORY] Update Establishment Categories Success',
  // Error global service
  CATEGORYSUCCESS = '[CATEGORY] Category Success',
  CATEGORYFAILURE = '[CATEGORY] Category Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[CATEGORY] Error To Null',
  SUCCESSTONULL = '[CATEGORY] Success To Null',
  // Clear state
  CLEARCATEGORY = '[CATEGORY] Clear Category'
}

export const getCategories = createAction(
  ActionTypes.GETCATEGORIES
);

export const getCategoriesSuccess = createAction(
  ActionTypes.GETCATEGORIESSUCCESS,
  props<{ categories: Array<Category> }>()
);

export const getEstablishmentCategories = createAction(
  ActionTypes.GETESTABLISHMENTCATEGORIES
);

export const getEstablishmentCategoriesSuccess = createAction(
  ActionTypes.GETESTABLISHMENTCATEGORIESSUCCESS,
  props<{ categories: Array<Category> }>()
);

export const updateEstablishmentCategories = createAction(
  ActionTypes.UPDATEESTABLISHMENTCATEGORIES,
  props<{ data: Array<ICategoryUpdateRequest> }>()
);

export const updateEstablishmentCategoriesSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTCATEGORIESSUCCESS,
  props<{ categories: Array<Category> }>()
);

export const categorySuccess = createAction(
  ActionTypes.CATEGORYSUCCESS,
  props<{ data: VMSuccess }>()
);

export const categoryFailure = createAction(
  ActionTypes.CATEGORYFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearCategory = createAction(
  ActionTypes.CLEARCATEGORY
);
