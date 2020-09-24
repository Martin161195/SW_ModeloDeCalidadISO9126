import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { HistoryEndpoint } from '@providers/endpoints/history.endpoint';
import { ProductEndpoint } from '@providers/endpoints/product.endpoint';
import { URL_APP } from '@settings/config/config';
import { Product, ProductWithPagination } from '@shared/models/product/product.class';
import { IProduct, IProductCreateRequestOrEdit, IProductVoucher, IProductWithPagination } from '@shared/models/product/product.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  createByEstablishment(localEstablishmentId: number, obj: IProductCreateRequestOrEdit): Observable<Product> {
    const query = `${this.apiUrl}${ProductEndpoint.createByEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IProduct) => new Product(res)),
        catchError(this.http.handleError)
      );
  }

  getByEstablishment(localEstablishmentId: number, params?: IPagination): Observable<ProductWithPagination> {
    const query = `${this.apiUrl}${ProductEndpoint.getByEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };
    if (!!params) { opts.params = { ...opts.params, ...params }; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IProductWithPagination) => new ProductWithPagination(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getProductHistory(productId: number, localEstablishmentId: number): Observable<Array<IProductVoucher>> {
    const query = `${this.apiUrl}${HistoryEndpoint.productProduct}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { productId, localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: any) => res.history),
        catchError(this.http.handleError)
      );
  }

  delete(productId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${ProductEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { productId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  update(productId: number, obj: IProductCreateRequestOrEdit): Observable<Product> {
    const query = `${this.apiUrl}${ProductEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { productId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IProduct) => new Product(res)),
        catchError(this.http.handleError)
      );
  }

}
