import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { ModuleEndpoint } from '@providers/endpoints/module.endpoint';
import { URL_APP } from '@settings/config/config';
import { Module } from '@shared/models/module/module.class';
import { IModule } from '@shared/models/module/module.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<Module>> {
    const query = `${this.apiUrl}${ModuleEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IModule>) => res.map((obj: IModule) => new Module(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getByEstablishment(localEstablishmentId: number): Observable<Array<number>> {
    const query = `${this.apiUrl}${ModuleEndpoint.getByEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
