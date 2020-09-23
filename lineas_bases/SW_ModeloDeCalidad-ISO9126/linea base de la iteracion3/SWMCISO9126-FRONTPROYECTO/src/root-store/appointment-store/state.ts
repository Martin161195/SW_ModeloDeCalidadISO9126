import { Appointment } from '@shared/models/appointment/appointment.class';
import { IQueryForGetAppointments } from '@shared/models/appointment/appointment.interface';

// tslint:disable-next-line: interface-name
export interface State {
  // appointments retrieve from server
  appointments: Array<Appointment> | null;
  // appointments retrieve from server, it's un copy
  appointmentsByUserAppNotVoucher: Array<Appointment> | null;
  // appointments retrieve from server, it's original
  appointmentsByUserAppNotVoucherBuffer: Array<Appointment> | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // QueryForGetSchedules query for get
  queryForGetAppointments: IQueryForGetAppointments | null;
  // State for appointment edit
  appointmentForEdit: Appointment | null;
  // State for appointment delete
  appointmentForDelete: Appointment | null;
  // State for appointment detail
  appointmentForDetail: Appointment | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Appointments
  isLoadingGetAppointments: boolean;
  // load while send request for Get Appointments
  isLoadingGetAppointmentsByUserAppNotVoucher: boolean;
  // load while send request for Create Appointment
  isLoadingCreateAppointment: boolean;
  // load while send request for Create Many Appointment
  isLoadingCreateManyAppointment: boolean;
  // load while send request for delete Appointment
  isLoadingDeleteAppointment: boolean;
  // load while send request for Update Appointment
  isLoadingUpdateAppointment: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  appointments: null,
  appointmentsByUserAppNotVoucher: null,
  appointmentsByUserAppNotVoucherBuffer: null,
  modalCreate: false,
  modalDetail: false,
  modalEdit: false,
  alertDelete: false,
  queryForGetAppointments: null,
  appointmentForEdit: null,
  appointmentForDelete: null,
  appointmentForDetail: null,
  error: null,
  success: null,
  isLoadingGetAppointments: false,
  isLoadingGetAppointmentsByUserAppNotVoucher: false,
  isLoadingCreateAppointment: false,
  isLoadingCreateManyAppointment: false,
  isLoadingDeleteAppointment: false,
  isLoadingUpdateAppointment: false,
  isLoadingGeneral: false
};
