import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { HistoryEndpoint } from '@providers/endpoints/history.endpoint';
import { UserAppEndpoint } from '@providers/endpoints/user-app.endpoint';
import { URL_APP } from '@settings/config/config';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IAppointment } from '@shared/models/appointment/appointment.interface';
import { IProductVoucher } from '@shared/models/product/product.interface';
import { Promotion } from '@shared/models/promotion/promotion.class';
import { IPromotion } from '@shared/models/promotion/promotion.interface';
import { UserApp } from '@shared/models/user-app/user-app.class';
import { IUserApp, IUserAppointmentHistoryPagination } from '@shared/models/user-app/user-app.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAppService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  getByDocument(documentTypeId: number, document: string): Observable<UserApp> {
    const query = `${this.apiUrl}${UserAppEndpoint.getByDocument}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        documentTypeId,
        document
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserApp) => new UserApp(res)),
        catchError(this.http.handleError)
      );
  }

  getByEmail(email: string): Observable<UserApp> {
    const query = `${this.apiUrl}${UserAppEndpoint.getByEmail}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { email }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserApp) => new UserApp(res)),
        catchError(this.http.handleError)
      );
  }

  getPromotionByCode(userAppId: number, localEstablishmentId: number, codePromotion: string): Observable<Promotion> {
    const query = `${this.apiUrl}${UserAppEndpoint.getPromotionByCode}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userAppId, localEstablishmentId, codePromotion }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IPromotion) => new Promotion(res)),
        catchError(this.http.handleError)
      );
  }

  existByDocument(typeDocumentId: number, document: string): Observable<any> {
    const query = `${this.apiUrl}${UserAppEndpoint.existByDocument}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        typeDocumentId,
        document
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: any) => res),
        catchError(this.http.handleError)
      );
  }

  getAppointmentHistory(userAppId: number, localEstablishmentId: number): Observable<Array<Appointment>> {
    const query = `${this.apiUrl}${HistoryEndpoint.appointment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userAppId, localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserAppointmentHistoryPagination) => res.history.map((a: IAppointment) => new Appointment(a))),
        catchError(this.http.handleError)
      );
  }

  getProductHistory(userAppId: number, localEstablishmentId: number): Observable<Array<IProductVoucher>> {
    const query = `${this.apiUrl}${HistoryEndpoint.product}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userAppId, localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: any) => res.history),
        catchError(this.http.handleError)
      );
  }
}
