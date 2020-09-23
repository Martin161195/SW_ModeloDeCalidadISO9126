import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { LocalEndpoint } from '@providers/endpoints/local.endpoint';
import { URL_APP } from '@settings/config/config';
import { LocalBusinessInformation, LocalGeneralInformation, LocalResponse } from '@shared/models/local/local.class';
import {
  ILocalBusinessForm,
  ILocalBusinessInformation,
  ILocalGeneralInformation,
  ILocalGeneralInformationEditRequest,
  ILocalResponse,
  ILocalStatusEditRequest
} from '@shared/models/local/local.interface';
import { Plan } from '@shared/models/plan/plan.class';
import { IPlan, IPlanUpdateRequest } from '@shared/models/plan/plan.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  planUserLocal: Plan;

  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  getInformation(): Observable<LocalResponse> {
    const query = `${this.apiUrl}${LocalEndpoint.getInformation}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: ILocalResponse) => new LocalResponse(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  updateInformation(newLocal: ILocalGeneralInformationEditRequest): Observable<LocalGeneralInformation> {
    const query = `${this.apiUrl}${LocalEndpoint.updateInformation}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.put(query, new OptionsRequestBefore(opts), newLocal)
      .pipe(
        map((res: ILocalGeneralInformation) => new LocalGeneralInformation(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  updateStatus(newStatus: ILocalStatusEditRequest): Observable<LocalResponse> {
    const query = `${this.apiUrl}${LocalEndpoint.updateStatus}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.put(query, new OptionsRequestBefore(opts), newStatus)
      .pipe(
        map((res: ILocalResponse) => new LocalResponse(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  updateBusiness(newBusiness: ILocalBusinessForm): Observable<LocalBusinessInformation> {
    const query = `${this.apiUrl}${LocalEndpoint.updateBusiness}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.put(query, new OptionsRequestBefore(opts), newBusiness)
      .pipe(
        map((res: ILocalBusinessInformation) => new LocalBusinessInformation(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  // Usado para la recarga de todos lo modulos
  getPlan(): Observable<Plan> {
    const query = `${this.apiUrl}${LocalEndpoint.getPlan}`;
    const opts: IOptionsRequest = {
      withCredentials: true
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        // tslint:disable-next-line:max-line-length
        map((res: IPlan) => new Plan(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  // Usado en el resolver
  getPlanInner(): Observable<Plan> {
    const query = `${this.apiUrl}${LocalEndpoint.getPlan}`;
    const opts: IOptionsRequest = {
      withCredentials: true
    };

    if (!!this.planUserLocal) {
      return of(this.planUserLocal);
    }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        // tslint:disable-next-line:max-line-length
        map((res: IPlan) => {
          this.planUserLocal = new Plan(res);

          return this.planUserLocal;
        }),
        retry(3),
        catchError(this.http.handleError)
      );

  }

  setPlanInner(plan: Plan | null): void {
    this.planUserLocal = plan;
  }

  updatePlan(newPlan: IPlanUpdateRequest): Observable<Plan> {
    const query = `${this.apiUrl}${LocalEndpoint.updatePlan}`;
    const opts: IOptionsRequest = {
      withCredentials: true
    };

    return this.http.put(query, new OptionsRequestBefore(opts), newPlan)
      .pipe(
        // tslint:disable-next-line:max-line-length
        map((res: IPlan) => new Plan(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
