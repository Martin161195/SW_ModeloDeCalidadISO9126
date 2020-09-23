import { createAction, props } from '@ngrx/store';
import { StatusAppointment } from '@shared/models/status-appointment/status-appointment.class';
import { IStatusAppointmentUpdateRequest } from '@shared/models/status-appointment/status-appointment.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETSTATUSAPPOINTMENTS = '[STATUSAPPOINTMENT] Get Status_Appointments',
  GETSTATUSAPPOINTMENTSSUCCESS = '[STATUSAPPOINTMENT] Get Status_Appointments Success',
  GETESTABLISHMENTSTATUSAPPOINTMENTS = '[STATUSAPPOINTMENT] Get Establishment Status_Appointments',
  GETESTABLISHMENTSTATUSAPPOINTMENTSSUCCESS = '[STATUSAPPOINTMENT] Get Establishment Status_Appointments Success',
  UPDATEESTABLISHMENTSTATUSAPPOINTMENTS = '[STATUSAPPOINTMENT] Update Establishment Status_Appointments',
  UPDATEESTABLISHMENTSTATUSAPPOINTMENTSSUCCESS = '[STATUSAPPOINTMENT] Update Establishment Status_Appointments Success',
  // Error global tatus_appointment
  STATUSAPPOINTMENTSUCCESS = '[STATUSAPPOINTMENT] Status_Appointment Success',
  STATUSAPPOINTMENTFAILURE = '[STATUSAPPOINTMENT] Status_Appointment Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[STATUSAPPOINTMENT] Error To Null',
  SUCCESSTONULL = '[STATUSAPPOINTMENT] Success To Null',
  // Clear state
  CLEARSTATUSAPPOINTMENT = '[STATUSAPPOINTMENT] Clear Status_Appointment'
}

export const getStatusAppointments = createAction(
  ActionTypes.GETSTATUSAPPOINTMENTS
);

export const getStatusAppointmentsSuccess = createAction(
  ActionTypes.GETSTATUSAPPOINTMENTSSUCCESS,
  props<{ appointmentStatus: Array<StatusAppointment> }>()
);

export const getEstablishmentStatusAppointments = createAction(
  ActionTypes.GETESTABLISHMENTSTATUSAPPOINTMENTS
);

export const getEstablishmentStatusAppointmentsSuccess = createAction(
  ActionTypes.GETESTABLISHMENTSTATUSAPPOINTMENTSSUCCESS,
  props<{ appointmentStatus: Array<StatusAppointment> }>()
);

export const updateEstablishmentStatusAppointments = createAction(
  ActionTypes.UPDATEESTABLISHMENTSTATUSAPPOINTMENTS,
  props<{ newAppointmentStatus: Array<IStatusAppointmentUpdateRequest> }>()
);

export const updateEstablishmentStatusAppointmentsSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTSTATUSAPPOINTMENTSSUCCESS,
  props<{ appointmentStatus: Array<StatusAppointment> }>()
);

export const statusAppointmentSuccess = createAction(
  ActionTypes.STATUSAPPOINTMENTSUCCESS,
  props<{ data: VMSuccess }>()
);

export const statusAppointmentFailure = createAction(
  ActionTypes.STATUSAPPOINTMENTFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearStatusAppointment = createAction(
  ActionTypes.CLEARSTATUSAPPOINTMENT
);
