import { _chunck } from '@core/common/helpers-array';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@shared/models/product/product.class';
import * as ProductStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(ProductStoreActions.getProducts, (state: State, { query }) => ({
    ...state,
    isLoadingGetProducts: true,
    isLoadingGeneral: true,
    query: {
      ...query
    }
  })),
  on(ProductStoreActions.getProductsSuccess, (state: State, { products }) => ({
    ...state,
    isLoadingGetProducts: false,
    isLoadingGeneral: false,
    currentPage: products.page,
    itemsPerPage: products.perPage,
    totalRecords: products.totalRecords,
    products: products.data
  })),
  on(ProductStoreActions.getProductsOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetProducts: true,
    isLoadingGeneral: true,
    query: {
      ...query
    }
  })),
  on(ProductStoreActions.getProductsOffSuccess, (state: State, { products }) => ({
    ...state,
    isLoadingGetProducts: false,
    isLoadingGeneral: false,
    currentPage: products.page,
    itemsPerPage: products.perPage,
    totalRecords: products.totalRecords,
    products: products.data
  })),
  on(ProductStoreActions.getProductsAll, (state: State) => ({
    ...state,
    isLoadingGetProductsAll: true,
    isLoadingGeneral: true
  })),
  on(ProductStoreActions.getProductsAllSuccess, (state: State, { products }) => ({
    ...state,
    isLoadingGetProductsAll: false,
    isLoadingGeneral: false,
    productsAll: products.data
  })),
  on(ProductStoreActions.getProductsAllClear, (state: State) => ({
    ...state,
    isLoadingGetProductsAll: false,
    isLoadingGeneral: false,
    productsAll: null
  })),
  on(ProductStoreActions.getProductsAllOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetProductsAll: true,
    isLoadingGeneral: true,
    query: {
      ...query
    }
  })),
  on(ProductStoreActions.getProductsAllOffSuccess, (state: State, { products }) => {
    let newProducts = [];
    const productsBuff = _chunck(products.data, products.perPage);
    if (productsBuff.length >= products.page && products.page > 0) {
      newProducts = productsBuff[products.page - 1];
    }

    return {
      ...state,
      isLoadingGetProductsAll: false,
      isLoadingGeneral: false,
      productsAll: products.data,
      currentPage: products.page,
      itemsPerPage: products.perPage,
      totalRecords: products.totalRecords,
      products: newProducts
    };
  }),
  on(ProductStoreActions.createProduct, (state: State) => ({
    ...state,
    isLoadingCreateProduct: true,
    isLoadingGeneral: true
  })),
  on(ProductStoreActions.createProductSuccess, (state: State) => ({
    ...state,
    isLoadingCreateProduct: false,
    isLoadingGeneral: false
  })),
  on(ProductStoreActions.deleteProduct, (state: State) => ({
    ...state,
    isLoadingDeleteProduct: true,
    isLoadingGeneral: true
  })),
  on(ProductStoreActions.deleteProductSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteProduct: false,
    isLoadingGeneral: false
  })),
  on(ProductStoreActions.updateProduct, (state: State) => ({
    ...state,
    isLoadingUpdateProduct: true,
    isLoadingGeneral: true
  })),
  on(ProductStoreActions.updateProductSuccess, (state: State, { product }) => {
    let buff = null;
    let buffAll = null;
    if (Array.isArray(state.products)) {
      const index = state.products.findIndex((s: Product) => s.id === product.id);
      buff = [...state.products];
      if (index !== -1) {
        buff = [...buff.slice(0, index), product, ...buff.slice(index + 1)];
      }
    }
    if (Array.isArray(state.productsAll)) {
      const indexAll = state.productsAll.findIndex((s: Product) => s.id === product.id);
      buffAll = [...state.productsAll];
      if (indexAll !== -1) {
        buffAll = [...buffAll.slice(0, indexAll), product, ...buffAll.slice(indexAll + 1)];
      }
    }

    return {
      ...state,
      products: buff,
      productsAll: buffAll,
      isLoadingUpdateProduct: false,
      isLoadingGeneral: false
    };
  }),
  on(ProductStoreActions.getCategories, (state: State) => ({
    ...state,
    isLoadingGetCategories: true,
    isLoadingGeneral: true
  })),
  on(ProductStoreActions.getCategoriesSuccess, (state: State, { categories }) => ({
    ...state,
    isLoadingGetCategories: false,
    isLoadingGeneral: false,
    categories
  })),
  on(ProductStoreActions.getProductHistory, (state: State) => ({
    ...state,
    isLoadingGetProductHistory: true,
    isLoadingGeneral: true
  })),
  on(ProductStoreActions.getProductHistorySuccess, (state: State, { history }) => ({
    ...state,
    isLoadingGetProductHistory: false,
    isLoadingGeneral: false,
    productHistory: history
  })),
  on(ProductStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(ProductStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(ProductStoreActions.modalDetailOpen, (state: State, { product }) => ({
    ...state,
    modalDetail: true,
    productForDetail: product
  })),
  on(ProductStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    productForDetail: null
  })),
  on(ProductStoreActions.modalEditOpen, (state: State, { product }) => ({
    ...state,
    modalEdit: true,
    productForEdit: product
  })),
  on(ProductStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    productForEdit: null
  })),
  on(ProductStoreActions.modalHistoryOpen, (state: State, { product }) => ({
    ...state,
    modalHistory: true,
    productForHistory: product
  })),
  on(ProductStoreActions.modalHistoryClose, (state: State) => ({
    ...state,
    modalHistory: false,
    productForHistory: null,
    productHistory: null
  })),
  on(ProductStoreActions.alertDeleteOpen, (state: State, { product }) => ({
    ...state,
    alertDelete: true,
    productForDelete: product
  })),
  on(ProductStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    productForDelete: null
  })),
  on(ProductStoreActions.productFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(ProductStoreActions.productSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(ProductStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(ProductStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(ProductStoreActions.clearProduct, (state: State) => ({
    products: null,
    productsAll: null,
    itemsPerPage: null,
    currentPage: null,
    totalRecords: null,
    query: null,
    categories: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    modalHistory: false,
    alertDelete: false,
    productForEdit: null,
    productForDetail: null,
    productForDelete: null,
    productForHistory: null,
    productHistory: null,
    error: null,
    success: null,
    isLoadingGetProducts: false,
    isLoadingGetProductsAll: false,
    isLoadingGetCategories: false,
    isLoadingCreateProduct: false,
    isLoadingUpdateProduct: false,
    isLoadingDeleteProduct: false,
    isLoadingGetProductHistory: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function productReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
