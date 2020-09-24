export interface IUserEstablishmentSchedule {
  id: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  freqType: number;
  freqRecurrence: number;
  freqInterval: Array<number>;
  freqEndDate?: string;
  localEstablishmentId: number;
  userEstablishmentId: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUserEstablishmentScheduleCreateRequestOrEdit {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  freqType: number;
  freqRecurrence: number;
  freqInterval: Array<number>;
  freqEndDate?: string;
  localEstablishmentId?: number;
  userEstablishmentId?: number;
  status: number;
}

export interface IQueryForGetSchedules {
  min: string;
  max: string;
  userEstablishmentId: number;
  localEstablishmentId: number;
}
