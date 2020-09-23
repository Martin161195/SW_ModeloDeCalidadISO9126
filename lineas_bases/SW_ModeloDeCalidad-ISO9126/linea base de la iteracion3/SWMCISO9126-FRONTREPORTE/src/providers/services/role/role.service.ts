import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { RoleEndpoint } from '@providers/endpoints/role.endpoint';
import { URL_APP } from '@settings/config/config';
import { Role } from '@shared/models/role/role.class';
import { IRole, IRoleCreateRequestOrEdit } from '@shared/models/role/role.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  create(obj: IRoleCreateRequestOrEdit): Observable<Role> {
    const query = `${this.apiUrl}${RoleEndpoint.create}`;
    const opts: IOptionsRequest = {
      withCredentials: true
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IRole) => new Role(res)),
        catchError(this.http.handleError)
      );
  }

  delete(roleId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${RoleEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { roleId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  get(): Observable<Array<Role>> {
    const query = `${this.apiUrl}${RoleEndpoint.get}`;
    const opts: IOptionsRequest = {
      withCredentials: true
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IRole>) => res.map((r: IRole) => new Role(r))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  update(roleId: number, obj: IRoleCreateRequestOrEdit): Observable<Role> {
    const query = `${this.apiUrl}${RoleEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { roleId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IRole) => new Role(res)),
        catchError(this.http.handleError)
      );
  }

}
