import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { StatusAppointmentEndpoint } from '@providers/endpoints/status-appointment.endpoint';
import { URL_APP } from '@settings/config/config';
import { StatusAppointment } from '@shared/models/status-appointment/status-appointment.class';
import { IStatusAppointment } from '@shared/models/status-appointment/status-appointment.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusAppointmentService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<StatusAppointment>> {
    const query = `${this.apiUrl}${StatusAppointmentEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IStatusAppointment>) => res.map((obj: IStatusAppointment) => new StatusAppointment(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
