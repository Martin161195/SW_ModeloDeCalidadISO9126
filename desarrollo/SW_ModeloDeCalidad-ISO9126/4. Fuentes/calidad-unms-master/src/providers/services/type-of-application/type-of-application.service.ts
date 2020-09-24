import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { TypeOfApplicationEndpoint } from '@providers/endpoints/type-of-application.endpoint';
import { URL_APP } from '@settings/config/config';
import { TypeOfApplication } from '@shared/models/type-of-application/type-of-application.class';
import { ITypeOfApplication } from '@shared/models/type-of-application/type-of-application.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeOfApplicationService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<TypeOfApplication>> {
    const query = `${this.apiUrl}${TypeOfApplicationEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<ITypeOfApplication>) => res.map((toa: ITypeOfApplication) => new TypeOfApplication(toa))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getByEstablishment(localEstablishmentId: number): Observable<Array<TypeOfApplication>> {
    const query = `${this.apiUrl}${TypeOfApplicationEndpoint.getByEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<ITypeOfApplication>) => res.map((toa: ITypeOfApplication) => new TypeOfApplication(toa))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
