import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { AppointmentEndpoint } from '@providers/endpoints/appointment.endpoint';
import { URL_APP } from '@settings/config/config';
import { Appointment } from '@shared/models/appointment/appointment.class';
import {
  IAppointment,
  IAppointmentCreateRequest,
  IAppointmentEditRequest,
  IQueryForGetAppointments,
  IQueryForGetAppointmentsByUserAppNotVoucher
} from '@shared/models/appointment/appointment.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  create(localEstablishmentId: number, obj: IAppointmentCreateRequest): Observable<Appointment> {
    const query = `${this.apiUrl}${AppointmentEndpoint.create}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userAppId: obj.userApp.id
      }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IAppointment) => new Appointment(res)),
        catchError(this.http.handleError)
      );
  }

  createMany(localEstablishmentId: number, obj: IAppointmentCreateRequest): Observable<Array<Appointment>> {
    const query = `${this.apiUrl}${AppointmentEndpoint.createMany}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId
      }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: Array<IAppointment>) => res.map((obj1: IAppointment) => new Appointment(obj1))),
        catchError(this.http.handleError)
      );
  }

  getByEstablishment(data: IQueryForGetAppointments): Observable<Array<Appointment>> {
    const query = `${this.apiUrl}${AppointmentEndpoint.getByEstablishment}`;
    const newData: any = {};
    if (!!data.usersWorkerId) { newData.usersWorkerId = JSON.stringify(data.usersWorkerId); }
    if (!!data.servicesId) { newData.servicesId = JSON.stringify(data.servicesId); }
    if (!!data.userAppId) { newData.userAppId = data.userAppId; }
    if (!!data.status) { newData.status = JSON.stringify(data.status); }
    newData.min = data.min;
    newData.max = data.max;
    newData.localEstablishmentId = data.localEstablishmentId;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        ...newData
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IAppointment>) => res.map((obj: IAppointment) => new Appointment(obj))),
        catchError(this.http.handleError)
      );
  }

  getByUserAppNotVoucher(data: IQueryForGetAppointmentsByUserAppNotVoucher): Observable<Array<Appointment>> {
    const query = `${this.apiUrl}${AppointmentEndpoint.getByUserAppNotVoucher}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: data
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IAppointment>) => res.map((obj: IAppointment) => new Appointment(obj))),
        catchError(this.http.handleError)
      );
  }

  delete(appointmentId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${AppointmentEndpoint.delete}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { appointmentId }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  update(appointmentId: number, obj: IAppointmentEditRequest): Observable<Appointment> {
    const query = `${this.apiUrl}${AppointmentEndpoint.update}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { appointmentId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IAppointment) => new Appointment(res)),
        catchError(this.http.handleError)
      );
  }

}
