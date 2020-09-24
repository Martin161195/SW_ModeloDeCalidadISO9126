import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { PlanEndpoint } from '@providers/endpoints/plan.endpoint';
import { URL_APP } from '@settings/config/config';
import { Plan } from '@shared/models/plan/plan.class';
import { IPlan } from '@shared/models/plan/plan.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<Plan>> {
    const query = `${this.apiUrl}${PlanEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IPlan>) => res.map((obj: IPlan) => new Plan(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
