import { IStatusAppointment } from './status-appointment.interface';

export class StatusAppointment {
  id: number;
  code: number;
  color: string;
  name: string;
  description: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  localEstablishmentId: number;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IStatusAppointment) {
    this.id = obj && obj.id || null;
    this.code = obj && obj.code || null;
    this.color = obj && obj.color || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
  }
}
