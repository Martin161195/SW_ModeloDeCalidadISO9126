import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { ServiceEndpoint } from '@providers/endpoints/service.endpoint';
import { URL_APP } from '@settings/config/config';
import { Service } from '@shared/models/service/service.class';
import { IService, IServiceCreateRequestOrEdit } from '@shared/models/service/service.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  delete(serviceId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${ServiceEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { serviceId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  update(serviceId: number, obj: IServiceCreateRequestOrEdit): Observable<Service> {
    const query = `${this.apiUrl}${ServiceEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { serviceId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IService) => new Service(res)),
        catchError(this.http.handleError)
      );
  }

}
