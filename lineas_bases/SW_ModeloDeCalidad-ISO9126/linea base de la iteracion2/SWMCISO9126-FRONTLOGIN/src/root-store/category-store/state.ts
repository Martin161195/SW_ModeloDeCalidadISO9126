import { Category } from '@shared/models/category/category.class';

// tslint:disable-next-line: interface-name
export interface State {
  // categories
  categories: Array<Category> | null;
  // categories
  establishmentCategories: Array<Category> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Categories
  isLoadingGetCategories: boolean;
  // load while send request for Get Establishment Categories
  isLoadingGetEstablishmentCategories: boolean;
  // load while send request for Update Establishment Categories
  isLoadingUpdateEstablishmentCategories: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  categories: null,
  establishmentCategories: null,
  error: null,
  success: null,
  isLoadingGetCategories: false,
  isLoadingGetEstablishmentCategories: false,
  isLoadingUpdateEstablishmentCategories: false,
  isLoadingGeneral: false
};
