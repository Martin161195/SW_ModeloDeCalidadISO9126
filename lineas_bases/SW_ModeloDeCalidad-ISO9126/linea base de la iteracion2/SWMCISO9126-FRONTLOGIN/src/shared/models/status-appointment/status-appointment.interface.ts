export interface IStatusAppointment {
  id: number;
  code: number;
  color: string;
  name: string;
  description: string;
  status: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  localEstablishmentId?: number;
}

export interface IStatusAppointmentUpdateRequest {
  statusAppointmentId: number;
  localEstablishmentId: number;
  color: string;
  status: number;
}
