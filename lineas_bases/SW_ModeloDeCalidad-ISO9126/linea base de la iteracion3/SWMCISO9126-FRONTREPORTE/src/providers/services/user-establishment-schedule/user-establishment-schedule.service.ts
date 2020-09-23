import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { UserEstablishmentScheduleEndpoint } from '@providers/endpoints/user-establishment-schedule.endpoint';
import { URL_APP } from '@settings/config/config';
import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
import {
  IUserEstablishmentSchedule,
  IUserEstablishmentScheduleCreateRequestOrEdit
} from '@shared/models/user-establishment-schedule/user-establishment-schedule.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEstablishmentScheduleService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  // tslint:disable-next-line:max-line-length
  create(localEstablishmentId: number, userEstablishmentId: number, obj: IUserEstablishmentScheduleCreateRequestOrEdit): Observable<UserEstablishmentSchedule> {
    const query = `${this.apiUrl}${UserEstablishmentScheduleEndpoint.create}`;
    const opts: IOptionsRequest = { withCredentials: true };
    obj.localEstablishmentId = localEstablishmentId;
    obj.userEstablishmentId = userEstablishmentId;

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserEstablishmentSchedule) => new UserEstablishmentSchedule(res)),
        catchError(this.http.handleError)
      );
  }

}
