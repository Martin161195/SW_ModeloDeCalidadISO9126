import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Category } from '@shared/models/category/category.class';
import { Product } from '@shared/models/product/product.class';
import { IProductVoucher } from '@shared/models/product/product.interface';

// tslint:disable-next-line: interface-name
export interface State {
  // products retrieve from server
  products: Array<Product> | null;
  // productsAll retrieve from server
  productsAll: Array<Product> | null;
  // number of products for view in table
  itemsPerPage: number | null;
  // currentPage
  currentPage: number | null;
  // currentPage
  totalRecords: number | null;
  // order
  query: IPagination | null;
  // categories
  categories: Array<Category> | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // State model create: open -> true, close -> false
  modalHistory: boolean;
  // State model create: open -> true, close -> false
  alertDelete: boolean;
  // State for product edit
  productForEdit: Product | null;
  // State for product delete
  productForDelete: Product | null;
  // State for product detail
  productForDetail: Product | null;
  // State for product history
  productForHistory: Product | null;
  // State for all products hystory
  productHistory: Array<IProductVoucher> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Products
  isLoadingGetProducts: boolean;
  // load while send request for Get Products All
  isLoadingGetProductsAll: boolean;
  // load while send request for Get Categories
  isLoadingGetCategories: boolean;
  // load while send request for Get Product history
  isLoadingGetProductHistory: boolean;
  // load while send request for Create Product
  isLoadingCreateProduct: boolean;
  // load while send request for Update Product
  isLoadingUpdateProduct: boolean;
  // load while send request for Delete Product
  isLoadingDeleteProduct: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
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
  productForDelete: null,
  productForDetail: null,
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
};
