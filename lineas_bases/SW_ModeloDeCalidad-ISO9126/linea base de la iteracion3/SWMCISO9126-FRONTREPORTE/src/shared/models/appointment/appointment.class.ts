import { GetDateFromhhmmssString, GetDateFromYYYYMMDDhhmmssString, GetDateFromYYYYMMDDString } from '@shared/helpers/functions/date';
import { IServiceCreateVoucher } from '../service/service.interface';
import { UserApp } from '../user-app/user-app.class';
import { UserEstablishment } from '../user-establishment/user-establishment.class';
import { IAppointment } from './appointment.interface';

export class Appointment {
  id: number;
  scheduleAppointmentDate: Date;
  scheduleAppointmentStartTime: Date;
  scheduleAppointmentEndTime: Date;
  service: IServiceCreateVoucher;
  total: number;
  sourceCurrencyId: number;
  localEstablishmentId: number;
  userWorkerId: number;
  userAppId: number;
  voucherId: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  userWorker: UserEstablishment;
  userApp: UserApp;
  startTimeForCalendar: Date;
  endTimeForCalendar: Date;
  statusString: string;
  // tslint:disable-next-line: cyclomatic-complexity
  constructor(obj?: IAppointment) {
    this.id = obj && obj.id || null;
    // tslint:disable-next-line: max-line-length
    this.scheduleAppointmentDate = obj && obj.scheduleAppointmentDate && GetDateFromYYYYMMDDString(obj.scheduleAppointmentDate, '-') || null;
    // tslint:disable-next-line: max-line-length
    this.scheduleAppointmentStartTime = obj && obj.scheduleAppointmentStartTime && GetDateFromhhmmssString(obj.scheduleAppointmentStartTime, ':') || null;
    // tslint:disable-next-line: max-line-length
    this.scheduleAppointmentEndTime = obj && obj.scheduleAppointmentEndTime && GetDateFromhhmmssString(obj.scheduleAppointmentEndTime, ':') || null;
    this.service = obj && obj.service || null;
    this.total = obj && obj.total || null;
    this.sourceCurrencyId = obj && obj.sourceCurrencyId || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
    this.userWorkerId = obj && obj.userWorkerId || null;
    this.userAppId = obj && obj.userAppId || null;
    this.voucherId = obj && obj.voucherId || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.userApp = obj && obj.userApp && new UserApp(obj.userApp) || null;
    this.userWorker = obj && obj.userWorker && new UserEstablishment(obj.userWorker) || null;
    if (obj && obj.scheduleAppointmentDate && obj.scheduleAppointmentStartTime) {
      this.startTimeForCalendar = GetDateFromYYYYMMDDhhmmssString(obj.scheduleAppointmentDate, obj.scheduleAppointmentStartTime);
    }
    if (obj && obj.scheduleAppointmentDate && obj.scheduleAppointmentEndTime) {
      this.endTimeForCalendar = GetDateFromYYYYMMDDhhmmssString(obj.scheduleAppointmentDate, obj.scheduleAppointmentEndTime);
    }
    if (obj && obj.status) {
      switch (obj.status) {
        case 1:
          this.statusString = 'Pendiente';
          break;
        case 2:
          this.statusString = 'En proceso';
          break;
        case 3:
          this.statusString = 'Completo';
          break;
        case 4:
          this.statusString = 'Cancelado';
          break;
        case 5:
          this.statusString = 'Eliminado';
          break;
        default:
          break;
      }
    }
  }
}
