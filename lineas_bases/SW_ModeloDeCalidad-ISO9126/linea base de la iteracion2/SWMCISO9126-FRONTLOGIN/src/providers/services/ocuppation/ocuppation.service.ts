import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { OcuppationEndpoint } from '@providers/endpoints/ocuppation.endpoint';
import { URL_APP } from '@settings/config/config';
import { Ocuppation } from '@shared/models/ocuppation/ocuppation.class';
import { IOcuppation } from '@shared/models/ocuppation/ocuppation.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OcuppationService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<Ocuppation>> {
    const query = `${this.apiUrl}${OcuppationEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IOcuppation>) => res.map((obj: IOcuppation) => new Ocuppation(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
