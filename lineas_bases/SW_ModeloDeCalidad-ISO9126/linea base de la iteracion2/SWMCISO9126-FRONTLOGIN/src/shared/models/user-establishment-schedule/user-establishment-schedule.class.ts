import { ONCE } from '@settings/constants/form/freq-type-schedule';
import { GetDateFromhhmmssString, GetDateFromYYYYMMDDhhmmssString, GetDateFromYYYYMMDDString } from '@shared/helpers/functions/date';
import { IUserEstablishmentSchedule } from './user-establishment-schedule.interface';

export class UserEstablishmentSchedule {
  id: number;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  freqType: number;
  freqRecurrence: number;
  freqInterval: Array<number>;
  freqEndDate: Date;
  localEstablishmentId: number;
  userEstablishmentId: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  startTimeForCalendar: Date;
  endTimeForCalendar: Date;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IUserEstablishmentSchedule) {
    this.id = obj && obj.id || null;
    this.startDate = obj && obj.startDate && GetDateFromYYYYMMDDString(obj.startDate, '-') || null;
    this.startTime = obj && obj.startTime && GetDateFromhhmmssString(obj.startTime, ':') || null;
    this.endDate = obj && obj.endDate && GetDateFromYYYYMMDDString(obj.endDate, '-') || null;
    this.endTime = obj && obj.endTime && GetDateFromhhmmssString(obj.endTime, ':') || null;
    this.freqRecurrence = obj && obj.freqRecurrence || 0;
    this.freqType = obj && obj.freqType || ONCE;
    this.freqInterval = obj && obj.freqInterval || [];
    this.freqEndDate = obj && obj.freqEndDate && GetDateFromYYYYMMDDString(obj.freqEndDate, '-') || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
    this.userEstablishmentId = obj && obj.userEstablishmentId || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    if (obj && obj.startDate && obj.startTime) {
      this.startTimeForCalendar = GetDateFromYYYYMMDDhhmmssString(obj.startDate, obj.startTime);
    }
    if (obj && obj.endDate && obj.endTime) {
      this.endTimeForCalendar = GetDateFromYYYYMMDDhhmmssString(obj.endDate, obj.endTime);
    }
  }
}
