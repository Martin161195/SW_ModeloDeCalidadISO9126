import { createAction, props } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import {
  IAppointmentCreateRequest,
  IAppointmentEditRequest,
  IQueryForGetAppointments
} from '@shared/models/appointment/appointment.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETAPPOINTMENTS = '[APPOINTMENT] Get Appointments',
  GETAPPOINTMENTSSUCCESS = '[APPOINTMENT] Get Appointments Success',
  GETAPPOINTMENTSBYUSERAPPNOTVOUCHER = '[APPOINTMENT] Get Appointments By UserApp not Voucher',
  GETAPPOINTMENTSBYUSERAPPNOTVOUCHERSUCCESS = '[APPOINTMENT] Get Appointments By UserApp not Voucher Success',
  CLEARGETAPPOINTMENTSBYUSERAPPNOTVOUCHER = '[APPOINTMENT] Clear Get Appointments By UserApp not Voucher',
  ADDAPPOINTMENTBYUSERTOVOUCHER = '[APPOINTMENT] Add Appointment By User to Voucher',
  REMOVEAPPOINTMENTBYUSERTOVOUCHER = '[APPOINTMENT] Remove Appointment By User to Voucher',
  CREATEAPPOINTMENT = '[APPOINTMENT] Create Appointment',
  CREATEAPPOINTMENTSUCCESS = '[APPOINTMENT] Create Appointment Success',
  CREATEMANYAPPOINTMENT = '[APPOINTMENT] Create Many Appointment',
  CREATEMANYAPPOINTMENTSUCCESS = '[APPOINTMENT] Create Many Appointment Success',
  DELETEAPPOINTMENT = '[APPOINTMENT] Delete Appointment',
  DELETEAPPOINTMENTSUCCESS = '[APPOINTMENT] Delete Appointment Success',
  UPDATEAPPOINTMENT = '[APPOINTMENT] Update Appointment',
  UPDATEAPPOINTMENTSUCCESS = '[APPOINTMENT] Update Appointment Success',
  // Events for modal
  MODALCREATEOPEN = '[APPOINTMENT] Modal Create Open',
  MODALCREATECLOSE = '[APPOINTMENT] Modal Create Close',
  MODALDETAILOPEN = '[APPOINTMENT] Modal Detail Open',
  MODALDETAILCLOSE = '[APPOINTMENT] Modal Detail Close',
  MODALEDITOPEN = '[APPOINTMENT] Modal Edit Open',
  MODALEDITCLOSE = '[APPOINTMENT] Modal Edit Close',
  ALERTDELETEOPEN = '[APPOINTMENT] Alert Delete Open',
  ALERTDELETECLOSE = '[APPOINTMENT] Alert Delete Close',
  // Error global Appointment
  APPOINTMENTSUCCESS = '[APPOINTMENT] Appointment Success',
  APPOINTMENTFAILURE = '[APPOINTMENT] Appointment Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[APPOINTMENT] Error To Null',
  SUCCESSTONULL = '[APPOINTMENT] Success To Null',
  // Clear state
  CLEARQUERYFORGETAPPOINTMENTS = '[APPOINTMENT] Clear QueryForGetAppointments',
  CLEARAPPOINTMENT = '[APPOINTMENT] Clear Appointment'
}

export const getAppointments = createAction(
  ActionTypes.GETAPPOINTMENTS,
  props<{ query: IQueryForGetAppointments }>()
);

export const getAppointmentsSuccess = createAction(
  ActionTypes.GETAPPOINTMENTSSUCCESS,
  props<{ appointments: Array<Appointment> }>()
);

export const getAppointmentsByUserAppNotVoucher = createAction(
  ActionTypes.GETAPPOINTMENTSBYUSERAPPNOTVOUCHER,
  props<{ userAppId: number }>()
);

export const getAppointmentsByUserAppNotVoucherSuccess = createAction(
  ActionTypes.GETAPPOINTMENTSBYUSERAPPNOTVOUCHERSUCCESS,
  props<{ appointments: Array<Appointment> }>()
);

export const clearGetAppointmentsByUserAppNotVoucher = createAction(
  ActionTypes.CLEARGETAPPOINTMENTSBYUSERAPPNOTVOUCHER
);

export const addAppointmentByUserToVoucher = createAction(
  ActionTypes.ADDAPPOINTMENTBYUSERTOVOUCHER,
  props<{ appointmentId: number }>()
);

export const removeAppointmentByUserToVoucher = createAction(
  ActionTypes.REMOVEAPPOINTMENTBYUSERTOVOUCHER,
  props<{ appointmentId: number }>()
);

export const createManyAppointment = createAction(
  ActionTypes.CREATEMANYAPPOINTMENT,
  props<{ newAppointment: IAppointmentCreateRequest }>()
);

export const createManyAppointmentSuccess = createAction(
  ActionTypes.CREATEMANYAPPOINTMENTSUCCESS,
  props<{ appointments: Array<Appointment> }>()
);

export const deleteAppointment = createAction(
  ActionTypes.DELETEAPPOINTMENT
);

export const deleteAppointmentSuccess = createAction(
  ActionTypes.DELETEAPPOINTMENTSUCCESS,
  props<{ data: VMDelete }>()
);

export const updateAppointment = createAction(
  ActionTypes.UPDATEAPPOINTMENT,
  props<{ newAppointment: IAppointmentEditRequest }>()
);

export const updateAppointmentSuccess = createAction(
  ActionTypes.UPDATEAPPOINTMENTSUCCESS,
  props<{ appointment: Appointment }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ appointment: Appointment }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ appointment: Appointment }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ appointment: Appointment }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const appointmentSuccess = createAction(
  ActionTypes.APPOINTMENTSUCCESS,
  props<{ data: VMSuccess }>()
);

export const appointmentFailure = createAction(
  ActionTypes.APPOINTMENTFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearQueryForGetAppointments = createAction(
  ActionTypes.CLEARQUERYFORGETAPPOINTMENTS
);

export const clearAppointment = createAction(
  ActionTypes.CLEARAPPOINTMENT
);
