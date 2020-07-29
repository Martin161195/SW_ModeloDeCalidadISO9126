import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { PaymentMethodEndpoint } from '@providers/endpoints/payment-method.endpoint';
import { URL_APP } from '@settings/config/config';
import { PaymentMethod } from '@shared/models/payment-method/payment-method.class';
import { IPaymentMethod } from '@shared/models/payment-method/payment-method.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<PaymentMethod>> {
    const query = `${this.apiUrl}${PaymentMethodEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IPaymentMethod>) => res.map((obj: IPaymentMethod) => new PaymentMethod(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
