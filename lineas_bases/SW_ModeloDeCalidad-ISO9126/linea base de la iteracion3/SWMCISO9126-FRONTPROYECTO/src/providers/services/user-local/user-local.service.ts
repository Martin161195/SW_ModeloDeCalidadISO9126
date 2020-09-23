import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { UserLocalEndpoint } from '@providers/endpoints/user-local.endpoint';
import { URL_APP } from '@settings/config/config';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { ILocalEstablishment } from '@shared/models/local-establishment/local-establishment.interface';
import { AuthUserLocal, UserLocal } from '@shared/models/user-local/user-local.class';
import {
  IAuthUserLocalLoginResponse,
  IUserLocal,
  IUserLocalCreateRequestOrEdit,
  IUserLocalLoginRequest,
  IUserLocalSigninRequest
} from '@shared/models/user-local/user-local.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { IVMSuccessInterface } from '@shared/models/vmsuccess/vm-success.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor(
    private readonly http: ApiService,
    private readonly nativeHttp: HttpClient,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  getEstablishments(userLocalId: number): Observable<Array<LocalEstablishment>> {
    const query = `${this.apiUrl}${UserLocalEndpoint.getEstablishments}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userLocalId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        // tslint:disable-next-line:max-line-length
        map((res: null | Array<ILocalEstablishment>) => res && Array.isArray(res) && res.map((obj: ILocalEstablishment) => new LocalEstablishment(obj)) || []),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  login(obj: IUserLocalLoginRequest): Observable<AuthUserLocal> {
    const query = `http://217.61.98.133:3001/${UserLocalEndpoint.login}`;

    return this.http.post(query, new OptionsRequestBefore(), obj)
      .pipe(
        map((res: IAuthUserLocalLoginResponse) => new AuthUserLocal({
          token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImNyZWF0ZWRBdCI6IjIwMjAtMDYtMDNUMjA6MjA6NDQuNzYzNTYxWiIsImVtYWlsIjoiZHVpdmFuNUBnbWFpbC5jb20iLCJlbWFpbFZlcmlmaWVkIjoxLCJmaXJzdE5hbWUiOiJEdWl2YW4iLCJpZCI6MSwibGFzdE5hbWUiOiJNYXRhIiwibG9jYWxJZCI6MSwib3duZXIiOjEsInBob25lIjoiOTc3ODE4OTk1IiwicGhvbmVWZXJpZmllZCI6Miwic3RhdHVzIjoxLCJ1cGRhdGVkQXQiOiIyMDIwLTA2LTAzVDIwOjIwOjQ0Ljc2MzU2MVoifSwiZXhwIjoxNTk4NTY5NDk4fQ.lvv04MX_C09tnGbMJ8-Xsemmx1wHew7Y8YwUhMUMeKqbAgrfjczRZK844VuIpql7923u0T0Uv-LVFk8BsNTtbRZbbG8lJmT3xB9uzkEDcvatjHjtGmKRaZQcL1K3aUpopzBJZ3nHFFDbiz4ATMnjUiACMDAf63plEOqjheOVlm8',
          user: {
            id: 1,
            firstName: 'User',
            lastName: 'User',
            email: 'user@gmail.com',
            phone: '736289212',
            emailVerified: 1,
            phoneVerified: 2,
            status: 1,
            owner: 1,
            localId: 1,
            createdAt: '2020-06-03T20:20:44.763Z',
            updatedAt: '2020-06-03T20:20:44.763Z',
            establishments: null
          }
        })),
        catchError(this.http.handleError)
      );
  }

  ponderacion(obj: any): Observable<any> {
    const query = `http://217.61.98.133:3002/${UserLocalEndpoint.ponderacion}?idProyecto=1`;

    return this.http.post(query, new OptionsRequestBefore(), obj)
      .pipe(
        catchError(this.http.handleError)
      );
  }

  resultado(): Observable<any> {
    const query = `http://217.61.98.133:3002/${UserLocalEndpoint.resultado}?idProyecto=1`;

    return this.http.get(query, new OptionsRequestBefore())
      .pipe(
        catchError(this.http.handleError)
      );
  }

  signin(obj: IUserLocalSigninRequest): Observable<VMSuccess> {
    const query = `http://217.61.98.133:3001/${UserLocalEndpoint.signin}`;

    return this.http.post(query, new OptionsRequestBefore(), obj)
      .pipe(
        map((res: IVMSuccessInterface) => new VMSuccess(res)),
        catchError(this.http.handleError)
      );
  }

  verifyEmail(token: string): Observable<VMSuccess> {
    const query = `http://217.61.98.133:3002/${UserLocalEndpoint.verifyEmail}`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `bearer ${token}`);

    return this.nativeHttp.get(query, { headers })
      .pipe(
        map((res: IVMSuccessInterface) => new VMSuccess(res)),
        catchError(this.http.handleError)
      );
  }

  getByLocal(): Observable<Array<UserLocal>> {
    const query = `${this.apiUrl}${UserLocalEndpoint.getByLocal}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IUserLocal>) => res.map((ul: IUserLocal) => new UserLocal(ul))),
        catchError(this.http.handleError)
      );
  }

  createByLocal(data: IUserLocalCreateRequestOrEdit): Observable<UserLocal> {
    const query = `${this.apiUrl}${UserLocalEndpoint.createByLocal}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.post(query, new OptionsRequestBefore(opts), data)
      .pipe(
        map((res: IUserLocal) => new UserLocal(res)),
        catchError(this.http.handleError)
      );
  }

  update(userLocalId: number, data: IUserLocalCreateRequestOrEdit): Observable<UserLocal> {
    const query = `${this.apiUrl}${UserLocalEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userLocalId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), data)
      .pipe(
        map((res: IUserLocal) => new UserLocal(res)),
        catchError(this.http.handleError)
      );
  }

  delete(userLocalId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${UserLocalEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userLocalId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

}
