import { IServiceCreateVoucher } from '../service/service.interface';

export interface IAppointment {
  id: number;
  scheduleAppointmentDate: string;
  scheduleAppointmentStartTime: string;
  scheduleAppointmentEndTime: string;
  service: IServiceCreateVoucher;
  total: number;
  sourceCurrencyId: number;
  localEstablishmentId: number;
  userWorkerId: number;
  userAppId: number;
  voucherId: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  userWorker: any;
  userApp: any;
}

export interface IAppointmentCreateRequest {
  appointments: Array<{
    scheduleAppointmentDate: string;
    scheduleAppointmentStartTime: string;
    scheduleAppointmentEndTime: string;
    service: IServiceCreateVoucher;
    total: number;
    sourceCurrencyId: number;
    userWorkerId?: number;
  }>;
  userApp: {
    id: number | null;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    source: string;
  };
}

export interface IAppointmentCreateVoucher {
  scheduleAppointmentDate: string;
  scheduleAppointmentStartTime: string;
  scheduleAppointmentEndTime: string;
  service: IServiceCreateVoucher;
  total: number;
  sourceCurrencyId: number;
  userWorkerId?: number;
}

export interface IAppointmentEditRequest {
  scheduleAppointmentDate: string;
  scheduleAppointmentStartTime: string;
  scheduleAppointmentEndTime: string;
  service: IServiceCreateVoucher;
  total: number;
  sourceCurrencyId: number;
  status: number;
  userWorkerId?: number;
}

export interface IQueryForGetAppointments {
  min: string;
  max: string;
  localEstablishmentId: number;
  status?: Array<number>;
  userAppId?: number;
  usersWorkerId?: Array<number>;
  servicesId?: Array<number>;
}

export interface IQueryForGetAppointmentsByUserAppNotVoucher {
  userAppId: number;
  localEstablishmentId: number;
}
