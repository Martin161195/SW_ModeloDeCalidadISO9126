import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { CurrencyEndpoint } from '@providers/endpoints/currency.endpoint';
import { URL_APP } from '@settings/config/config';
import { Currency } from '@shared/models/currency/currency.class';
import { ICurrency } from '@shared/models/currency/currency.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  getByCurrency(search: string): Observable<Array<Currency>> {
    const query = `${this.apiUrl}${CurrencyEndpoint.getByCurrency}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { search }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<ICurrency>) => res.map((obj: ICurrency) => new Currency(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
