import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createAction, props } from '@ngrx/store';
import { Category } from '@shared/models/category/category.class';
import { Product, ProductWithPagination } from '@shared/models/product/product.class';
import { IProductCreateRequestOrEdit, IProductVoucher } from '@shared/models/product/product.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETPRODUCTS = '[PRODUCT] Get Products',
  GETPRODUCTSSUCCESS = '[PRODUCT] Get Products Success',
  GETPRODUCTSOFF = '[PRODUCT] Get Products Off',
  GETPRODUCTSOFFSUCCESS = '[PRODUCT] Get Products Off Success',
  GETPRODUCTSALL = '[PRODUCT] Get Products All',
  GETPRODUCTSALLSUCCESS = '[PRODUCT] Get Products All Success',
  GETPRODUCTSALLCLEAR = '[PRODUCT] Get Products All Clear',
  GETPRODUCTSALLOFF = '[PRODUCT] Get Products All Off',
  GETPRODUCTSALLOFFSUCCESS = '[PRODUCT] Get Products All Off Success',
  GETCATEGORIES = '[PRODUCT] Get Categories',
  GETCATEGORIESSUCCESS = '[PRODUCT] Get Categories Success',
  GETPRODUCTHISTORY = '[PRODUCT] Get Product history',
  GETPRODUCTHISTORYSUCCESS = '[PRODUCT] Get Product history Success',
  CREATEPRODUCT = '[PRODUCT] Create Product',
  CREATEPRODUCTSUCCESS = '[PRODUCT] Create Product Success',
  UPDATEPRODUCT = '[PRODUCT] Update Product',
  UPDATEPRODUCTSUCCESS = '[PRODUCT] Update Product Success',
  DELETEPRODUCT = '[PRODUCT] Delete Product',
  DELETEPRODUCTSUCCESS = '[PRODUCT] Delete Product Success',
  // Events for modal
  MODALCREATEOPEN = '[PRODUCT] Modal Create Open',
  MODALCREATECLOSE = '[PRODUCT] Modal Create Close',
  MODALDETAILOPEN = '[PRODUCT] Modal Detail Open',
  MODALDETAILCLOSE = '[PRODUCT] Modal Detail Close',
  MODALEDITOPEN = '[PRODUCT] Modal Edit Open',
  MODALEDITCLOSE = '[PRODUCT] Modal Edit Close',
  MODALHISTORYOPEN = '[PRODUCT] Modal History Open',
  MODALHISTORYCLOSE = '[PRODUCT] Modal History Close',
  ALERTDELETEOPEN = '[PRODUCT] Alert Delete Open',
  ALERTDELETECLOSE = '[PRODUCT] Alert Delete Close',
  // Error global product
  PRODUCTSUCCESS = '[PRODUCT] Product Success',
  PRODUCTFAILURE = '[PRODUCT] Product Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[PRODUCT] Error To Null',
  SUCCESSTONULL = '[PRODUCT] Success To Null',
  // Clear state
  CLEARPRODUCT = '[PRODUCT] Clear Product'
}

export const getProducts = createAction(
  ActionTypes.GETPRODUCTS,
  props<{ query: IPagination }>()
);

export const getProductsSuccess = createAction(
  ActionTypes.GETPRODUCTSSUCCESS,
  props<{ products: ProductWithPagination }>()
);

export const getProductsOff = createAction(
  ActionTypes.GETPRODUCTSOFF,
  props<{ query: IPagination }>()
);

export const getProductsOffSuccess = createAction(
  ActionTypes.GETPRODUCTSOFFSUCCESS,
  props<{ products: ProductWithPagination }>()
);

export const getProductsAll = createAction(
  ActionTypes.GETPRODUCTSALL
);

export const getProductsAllSuccess = createAction(
  ActionTypes.GETPRODUCTSALLSUCCESS,
  props<{ products: ProductWithPagination }>()
);

export const getProductsAllClear = createAction(
  ActionTypes.GETPRODUCTSALLCLEAR
);

export const getProductsAllOff = createAction(
  ActionTypes.GETPRODUCTSALLOFF,
  props<{ query: IPagination }>()
);

export const getProductsAllOffSuccess = createAction(
  ActionTypes.GETPRODUCTSALLOFFSUCCESS,
  props<{ products: ProductWithPagination }>()
);

export const getCategories = createAction(
  ActionTypes.GETCATEGORIES
);

export const getCategoriesSuccess = createAction(
  ActionTypes.GETCATEGORIESSUCCESS,
  props<{ categories: Array<Category> }>()
);

export const getProductHistory = createAction(
  ActionTypes.GETPRODUCTHISTORY,
  props<{ product: Product }>()
);

export const getProductHistorySuccess = createAction(
  ActionTypes.GETPRODUCTHISTORYSUCCESS,
  props<{ history: Array<IProductVoucher> }>()
);

export const createProduct = createAction(
  ActionTypes.CREATEPRODUCT,
  props<{ newProduct: IProductCreateRequestOrEdit }>()
);

export const createProductSuccess = createAction(
  ActionTypes.CREATEPRODUCTSUCCESS,
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  ActionTypes.UPDATEPRODUCT,
  props<{ newProduct: IProductCreateRequestOrEdit }>()
);

export const updateProductSuccess = createAction(
  ActionTypes.UPDATEPRODUCTSUCCESS,
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  ActionTypes.DELETEPRODUCT
);

export const deleteProductSuccess = createAction(
  ActionTypes.DELETEPRODUCTSUCCESS,
  props<{ data: VMDelete }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ product: Product }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ product: Product }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const modalHistoryOpen = createAction(
  ActionTypes.MODALHISTORYOPEN,
  props<{ product: Product }>()
);

export const modalHistoryClose = createAction(
  ActionTypes.MODALHISTORYCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ product: Product }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const productSuccess = createAction(
  ActionTypes.PRODUCTSUCCESS,
  props<{ data: VMSuccess }>()
);

export const productFailure = createAction(
  ActionTypes.PRODUCTFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearProduct = createAction(
  ActionTypes.CLEARPRODUCT
);
