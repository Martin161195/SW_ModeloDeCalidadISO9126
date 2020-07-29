import { createAction, props } from '@ngrx/store';
import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
// tslint:disable-next-line:max-line-length
import { IQueryForGetSchedules, IUserEstablishmentScheduleCreateRequestOrEdit } from '@shared/models/user-establishment-schedule/user-establishment-schedule.interface';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETUSERESTABLISHMENT = '[USERESTABLISHMENTSCHEDULE] Get User Establishment',
  GETUSERESTABLISHMENTSUCCESS = '[USERESTABLISHMENTSCHEDULE] Get User Establishment Success',
  GETUSERESTABLISHMENTSCHEDULES = '[USERESTABLISHMENTSCHEDULE] Get User Establishment Schedules',
  GETUSERESTABLISHMENTSCHEDULESSUCCESS = '[USERESTABLISHMENTSCHEDULE] Get User Establishment Schedules Success',
  CREATEUSERESTABLISHMENTSCHEDULE = '[USERESTABLISHMENTSCHEDULE] Create User Establishment Schedule',
  CREATEUSERESTABLISHMENTSCHEDULESUCCESS = '[USERESTABLISHMENTSCHEDULE] Create User Establishment Schedule Success',
  UPDATEUSERESTABLISHMENTSCHEDULE = '[USERESTABLISHMENTSCHEDULE] Update User Establishment Schedule',
  UPDATEUSERESTABLISHMENTSCHEDULESUCCESS = '[USERESTABLISHMENTSCHEDULE] Update User Establishment Schedule Success',
  // Events for modal
  MODALCREATEOPEN = '[USERESTABLISHMENTSCHEDULE] Modal Create Open',
  MODALCREATECLOSE = '[USERESTABLISHMENTSCHEDULE] Modal Create Close',
  MODALDETAILOPEN = '[USERESTABLISHMENTSCHEDULE] Modal Detail Open',
  MODALDETAILCLOSE = '[USERESTABLISHMENTSCHEDULE] Modal Detail Close',
  MODALEDITOPEN = '[USERESTABLISHMENTSCHEDULE] Modal Edit Open',
  MODALEDITCLOSE = '[USERESTABLISHMENTSCHEDULE] Modal Edit Close',
  // Error global User Establishment Schedule
  USERESTABLISHMENTSCHEDULESUCCESS = '[USERESTABLISHMENTSCHEDULE] User Establishment Schedule Success',
  USERESTABLISHMENTSCHEDULEFAILURE = '[USERESTABLISHMENTSCHEDULE] User Establishment Schedule Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[USERESTABLISHMENTSCHEDULE] Error To Null',
  SUCCESSTONULL = '[USERESTABLISHMENTSCHEDULE] Success To Null',
  // Clear state
  CLEARQUERYFORGETSCHEDULES = '[USERESTABLISHMENTSCHEDULE] Clear QueryForGetSchedules',
  CLEARUSERESTABLISHMENTSCHEDULE = '[USERESTABLISHMENTSCHEDULE] Clear User Establishment Schedule'
}

export const getUserEstablishment = createAction(
  ActionTypes.GETUSERESTABLISHMENT,
  props<{ userEstablishmentId: number }>()
);

export const getUserEstablishmentSuccess = createAction(
  ActionTypes.GETUSERESTABLISHMENTSUCCESS,
  props<{ userEstablishment: UserEstablishment }>()
);

export const getUserEstablishmentSchedules = createAction(
  ActionTypes.GETUSERESTABLISHMENTSCHEDULES,
  props<{ query: IQueryForGetSchedules }>()
);

export const getUserEstablishmentSchedulesSuccess = createAction(
  ActionTypes.GETUSERESTABLISHMENTSCHEDULESSUCCESS,
  props<{ schedules: Array<UserEstablishmentSchedule> }>()
);

export const createUserEstablishmentSchedule = createAction(
  ActionTypes.CREATEUSERESTABLISHMENTSCHEDULE,
  props<{ newSchedule: IUserEstablishmentScheduleCreateRequestOrEdit }>()
);

export const createUserEstablishmentScheduleSuccess = createAction(
  ActionTypes.CREATEUSERESTABLISHMENTSCHEDULESUCCESS,
  props<{ schedule: UserEstablishmentSchedule }>()
);

export const updateUserEstablishmentSchedule = createAction(
  ActionTypes.UPDATEUSERESTABLISHMENTSCHEDULE,
  props<{ newSchedule: IUserEstablishmentScheduleCreateRequestOrEdit }>()
);

export const updateUserEstablishmentScheduleSuccess = createAction(
  ActionTypes.UPDATEUSERESTABLISHMENTSCHEDULESUCCESS,
  props<{ schedule: UserEstablishmentSchedule }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ schedule: UserEstablishmentSchedule }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ schedule: UserEstablishmentSchedule }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const userEstablishmentScheduleSuccess = createAction(
  ActionTypes.USERESTABLISHMENTSCHEDULESUCCESS,
  props<{ data: VMSuccess }>()
);

export const userEstablishmentScheduleFailure = createAction(
  ActionTypes.USERESTABLISHMENTSCHEDULEFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearQueryForGetSchedules = createAction(
  ActionTypes.CLEARQUERYFORGETSCHEDULES
);

export const clearUserEstablishmentSchedule = createAction(
  ActionTypes.CLEARUSERESTABLISHMENTSCHEDULE
);
