import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Category } from '@shared/models/category/category.class';
import { Product } from '@shared/models/product/product.class';
import { IProductVoucher } from '@shared/models/product/product.interface';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetProducts = (state: State): boolean => state.isLoadingGetProducts;

const getIsLoadingGetProductsAll = (state: State): boolean => state.isLoadingGetProductsAll;

const getIsLoadingCreateProduct = (state: State): boolean => state.isLoadingCreateProduct;

const getIsLoadingUpdateProduct = (state: State): boolean => state.isLoadingUpdateProduct;

const getIsLoadingDeleteProduct = (state: State): boolean => state.isLoadingDeleteProduct;

const getIsLoadingCategories = (state: State): boolean => state.isLoadingGetCategories;

const getIsLoadingGetProductHistory = (state: State): boolean => state.isLoadingGetProductHistory;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getProducts = (state: State): Array<Product> | null => state.products;

const getProductsAll = (state: State): Array<Product> | null => state.productsAll;

const getProductForDelete = (state: State): Product | null => state.productForDelete;

const getProductForDetail = (state: State): Product | null => state.productForDetail;

const getProductForEdit = (state: State): Product | null => state.productForEdit;

const getProductForHistory = (state: State): Product | null => state.productForHistory;

const getProductHistory = (state: State): Array<IProductVoucher> | null => state.productHistory;

const getCategories = (state: State): Array<Category> | null => state.categories;

const getItemsPerPage = (state: State): number | null => state.itemsPerPage;

const getCurrentPage = (state: State): number | null => state.currentPage;

const getTotalRecords = (state: State): number | null => state.totalRecords;

const getQuery = (state: State): IPagination => state.query;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getModalHistory = (state: State): boolean => state.modalHistory;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectProductState: MemoizedSelector<object, State> = createFeatureSelector<State>('product');

export const selectProductError: MemoizedSelector<object, string | null> = createSelector(
  selectProductState,
  getError
);

export const selectProductSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectProductState,
  getSuccess
);

export const selectProductIsLoadingGetProducts: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingGetProducts
);

export const selectProductIsLoadingGetProductsAll: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingGetProductsAll
);

export const selectProductIsLoadingCreateProduct: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingCreateProduct
);

export const selectProductIsLoadingUpdateProduct: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingUpdateProduct
);

export const selectProductIsLoadingDeleteProduct: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingDeleteProduct
);

export const selectProductIsLoadingGetCategories: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingCategories
);

export const selectProductIsLoadingGetProductHistory: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingGetProductHistory
);

export const selectProductIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getIsLoadingGeneral
);

export const selectProducts: MemoizedSelector<object, Array<Product> | null> = createSelector(
  selectProductState,
  getProducts
);

export const selectProductsAll: MemoizedSelector<object, Array<Product> | null> = createSelector(
  selectProductState,
  getProductsAll
);

export const selectProductForDelete: MemoizedSelector<object, Product | null> = createSelector(
  selectProductState,
  getProductForDelete
);

export const selectProductForDetail: MemoizedSelector<object, Product | null> = createSelector(
  selectProductState,
  getProductForDetail
);

export const selectProductForEdit: MemoizedSelector<object, Product | null> = createSelector(
  selectProductState,
  getProductForEdit
);

export const selectProductForHistory: MemoizedSelector<object, Product | null> = createSelector(
  selectProductState,
  getProductForHistory
);

export const selectProductHistory: MemoizedSelector<object, Array<IProductVoucher> | null> = createSelector(
  selectProductState,
  getProductHistory
);

export const selectCategories: MemoizedSelector<object, Array<Category> | null> = createSelector(
  selectProductState,
  getCategories
);

export const selectProductItemsPerPage: MemoizedSelector<object, number | number> = createSelector(
  selectProductState,
  getItemsPerPage
);

export const selectProductCurrentPage: MemoizedSelector<object, number | number> = createSelector(
  selectProductState,
  getCurrentPage
);

export const selectProductTotalRecords: MemoizedSelector<object, number | null> = createSelector(
  selectProductState,
  getTotalRecords
);

export const selectProductQuery: MemoizedSelector<object, IPagination> = createSelector(
  selectProductState,
  getQuery
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getModalDetail
);

export const selectModalHistory: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getModalHistory
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectProductState,
  getAlertDelete
);
