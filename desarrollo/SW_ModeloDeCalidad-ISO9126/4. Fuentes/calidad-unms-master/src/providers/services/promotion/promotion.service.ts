import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { PromotionEndpoint } from '@providers/endpoints/promotion.endpoint';
import { URL_APP } from '@settings/config/config';
import { Promotion } from '@shared/models/promotion/promotion.class';
import { IPromotion, IPromotionEdit } from '@shared/models/promotion/promotion.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  delete(promotionId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${PromotionEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { promotionId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  update(promotionId: number, obj: IPromotionEdit): Observable<Promotion> {
    const query = `${this.apiUrl}${PromotionEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { promotionId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IPromotion) => new Promotion(res)),
        catchError(this.http.handleError)
      );
  }

  checkUniqueCode(params?: any): Observable<Array<Promotion>> {
    const query = `${this.apiUrl}${PromotionEndpoint.checkCode}`;
    const opts: IOptionsRequest = { withCredentials: true };
    if (!!params) { opts.params = params; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IPromotion>) => res.map((obj: IPromotion) => new Promotion(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  /*

  update(obj: IPromotionCreateOrEditRequest, id: number): Observable<Promotion> {
    const query = `${this.apiUrl}${PromotionEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { id }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IPromotion) => new Promotion(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  } */

}
