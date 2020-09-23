import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { UserEstablishmentEndpoint } from '@providers/endpoints/user-establishment.endpoint';
import { URL_APP } from '@settings/config/config';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';
import { IUserEstablishment } from '@shared/models/user-establishment/user-establishment.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEstablishmentService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  getByDocument(documentTypeId: number, document: string): Observable<UserEstablishment> {
    const query = `${this.apiUrl}${UserEstablishmentEndpoint.getByDocument}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        documentTypeId,
        document
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserEstablishment) => new UserEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

  getByEmail(email: string): Observable<UserEstablishment> {
    const query = `${this.apiUrl}${UserEstablishmentEndpoint.getByEmail}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { email }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserEstablishment) => new UserEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

}
