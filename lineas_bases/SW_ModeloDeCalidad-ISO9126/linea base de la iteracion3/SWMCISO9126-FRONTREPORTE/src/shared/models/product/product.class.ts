import { Subcategory } from '@shared/models/subcategory/subcategory.class';
import { ISubcategory } from '../subcategory/subcategory.interface';
import { IProduct, IProductWithPagination } from './product.interface';

export class Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  pricePromo: number;
  price: number;
  symbol: string;
  images: Array<string>;
  status: number;
  localEstablishmentId: number;
  createdAt: Date;
  updatedAt: Date;
  subcategories: Array<Subcategory>;
  discountPercent: number;
  discountCoin: number;
  showPrice: string;
  showPricePromo: string;
  showDiscount: string;
  statusProduct: string;

  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IProduct) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.quantity = obj && obj.quantity || null;
    this.pricePromo = obj && typeof (obj.pricePromo) === 'number'
      ? (obj.pricePromo >= 0 ? obj.pricePromo : null) : null;
    this.price = obj && typeof (obj.price) === 'number'
      ? (obj.price >= 0 ? obj.price : null) : null;
    this.symbol = obj && obj.symbol || null;
    this.images = obj && obj.images || null;
    this.status = obj && obj.status || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.subcategories = obj && obj.subcategories && obj.subcategories.map((obj1: ISubcategory) => new Subcategory(obj1)) || [];
    this.discountPercent = (this.pricePromo === null) ? 0 : parseFloat(this.pricePromo.toFixed(2));
    this.discountCoin = (this.pricePromo === null) ? 0 : (this.price - this.pricePromo);
    this.showPrice = (this.price === null) ? 'Sin valor' : `${this.symbol} ${this.price.toFixed(2)}`;
    this.showPricePromo = (this.pricePromo === null) ? 'Sin valor' : `${this.symbol} ${this.pricePromo.toFixed(2)}`;
    this.showDiscount = (this.pricePromo === null) ? 'Sin Descuento' : `${((this.pricePromo - this.price) * 100 / this.price).toFixed(2)}%`;
    this.statusProduct = (this.status === 1) ? 'Activo' : `Inactivo`;
  }
}

export class ProductWithPagination {
  data: Array<Product>;
  page: number;
  perPage: number;
  totalRecords: number;
  constructor(obj?: IProductWithPagination) {
    this.data = obj && obj.data && obj.data.map((obj1: IProduct) => new Product(obj1)) || null;
    this.page = obj && obj.page || null;
    this.perPage = obj && obj.perPage || null;
    this.totalRecords = obj && obj.totalRecords || null;
  }
}
