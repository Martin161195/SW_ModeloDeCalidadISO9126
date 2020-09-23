import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { VoucherEndpoint } from '@providers/endpoints/voucher.endpoint';
import { URL_APP } from '@settings/config/config';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Voucher, VoucherWithPagination } from '@shared/models/voucher/voucher.class';
import {
  IVoucher,
  IVoucherCreateRequest,
  IVoucherCreateRequestOrEdit,
  IVoucherWithPagination
} from '@shared/models/voucher/voucher.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  createByEstablishment(localEstablishmentId: number, userAppId: number, obj: IVoucherCreateRequest): Observable<IVoucherCreateRequest> {
    const query = `${this.apiUrl}${VoucherEndpoint.createByEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userAppId
      }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        catchError(this.http.handleError)
      );
  }

  delete(voucherId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${VoucherEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { voucherId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  getByEstablishment(localEstablishmentId: number, params?: IPagination): Observable<VoucherWithPagination> {
    const query = `${this.apiUrl}${VoucherEndpoint.getByEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };
    if (!!params) { opts.params = { ...opts.params, ...params }; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVoucherWithPagination) => new VoucherWithPagination(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  update(voucherId: number, obj: IVoucherCreateRequestOrEdit): Observable<Voucher> {
    const query = `${this.apiUrl}${VoucherEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { voucherId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IVoucher) => new Voucher(res)),
        catchError(this.http.handleError)
      );
  }

}
