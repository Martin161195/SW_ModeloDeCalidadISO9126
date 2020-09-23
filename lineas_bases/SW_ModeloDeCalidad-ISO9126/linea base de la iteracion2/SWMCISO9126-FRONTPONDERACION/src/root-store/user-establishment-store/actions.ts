import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createAction, props } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Ocuppation } from '@shared/models/ocuppation/ocuppation.class';
import { UserEstablishment, UserEstablishmentWithPagination } from '@shared/models/user-establishment/user-establishment.class';
import {
  IUserEstablishmentAddRequest,
  IUserEstablishmentCreateRequestOrEdit
} from '@shared/models/user-establishment/user-establishment.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETUSERSESTABLISHMENT = '[USERESTABLISHMENT] Get UsersEstablishment',
  GETUSERSESTABLISHMENTSUCCESS = '[USERESTABLISHMENT] Get UsersEstablishment Success',
  GETUSERSESTABLISHMENTOFF = '[USERESTABLISHMENT] Get UsersEstablishment Off',
  GETUSERSESTABLISHMENTOFFSUCCESS = '[USERESTABLISHMENT] Get UsersEstablishment Off Success',
  GETUSERSESTABLISHMENTALL = '[USERESTABLISHMENT] Get UsersEstablishment All',
  GETUSERSESTABLISHMENTALLSUCCESS = '[USERESTABLISHMENT] Get UsersEstablishment All Success',
  GETUSERSESTABLISHMENTALLCLEAR = '[USERESTABLISHMENT] Get UsersEstablishment All Clear',
  GETUSERSESTABLISHMENTALLOFF = '[USERESTABLISHMENT] Get UsersEstablishment All Off',
  GETUSERSESTABLISHMENTALLOFFSUCCESS = '[USERESTABLISHMENT] Get UsersEstablishment All Off Success',
  GETUSERESTABLISHMENTBYDOCUMENT = '[USERESTABLISHMENT] Get UsersEstablishment by document',
  GETUSERESTABLISHMENTBYDOCUMENTSUCCESS = '[USERESTABLISHMENT] Get UsersEstablishment by document Success',
  GETUSERESTABLISHMENTBYDOCUMENTCLEAR = '[USERESTABLISHMENT] Get UsersEstablishment by document Clear',
  GETUSERESTABLISHMENTBYEMAIL = '[USERESTABLISHMENT] Get UsersEstablishment by email',
  GETUSERESTABLISHMENTBYEMAILSUCCESS = '[USERESTABLISHMENT] Get UsersEstablishment by email Success',
  GETUSERESTABLISHMENTBYEMAILCLEAR = '[USERESTABLISHMENT] Get UsersEstablishment by email Clear',
  GETOCUPPATIONS = '[USERESTABLISHMENT] Get Ocuppations',
  GETOCUPPATIONSSUCCESS = '[USERESTABLISHMENT] Get Ocuppations Success',
  GETAPPOINMENTHISTORY = '[USERESTABLISHMENT] Get Appointments history',
  GETAPPOINMENTHISTORYSUCCESS = '[USERESTABLISHMENT] Get Appointments history Success',
  CREATEUSERESTABLISHMENT = '[USERESTABLISHMENT] Create UserEstablishment',
  CREATEUSERESTABLISHMENTSUCCESS = '[USERESTABLISHMENT] Create UserEstablishment Success',
  ADDUSERESTABLISHMENT = '[USERESTABLISHMENT] Add UserEstablishment',
  ADDUSERESTABLISHMENTSUCCESS = '[USERESTABLISHMENT] Add UserEstablishment Success',
  UPDATEUSERESTABLISHMENT = '[USERESTABLISHMENT] Update UserEstablishment',
  UPDATEUSERESTABLISHMENTSUCCESS = '[USERESTABLISHMENT] Update UserEstablishment Success',
  DELETEUSERESTABLISHMENT = '[USERESTABLISHMENT] Delete UserEstablishment',
  DELETEUSERESTABLISHMENTSUCCESS = '[USERESTABLISHMENT] Delete UserEstablishment Success',
  // Events for modal
  MODALCREATEOPEN = '[USERESTABLISHMENT] Modal Create Open',
  MODALCREATECLOSE = '[USERESTABLISHMENT] Modal Create Close',
  MODALDETAILOPEN = '[USERESTABLISHMENT] Modal Detail Open',
  MODALDETAILCLOSE = '[USERESTABLISHMENT] Modal Detail Close',
  MODALHISTORYOPEN = '[USERESTABLISHMENT] Modal History Open',
  MODALHISTORYCLOSE = '[USERESTABLISHMENT] Modal History Close',
  MODALEDITOPEN = '[USERESTABLISHMENT] Modal Edit Open',
  MODALEDITCLOSE = '[USERESTABLISHMENT] Modal Edit Close',
  ALERTDELETEOPEN = '[USERESTABLISHMENT] Alert Delete Open',
  ALERTDELETECLOSE = '[USERESTABLISHMENT] Alert Delete Close',
  // Error global UserEstablishment
  USERESTABLISHMENTSUCCESS = '[USERESTABLISHMENT] UserEstablishment Success',
  USERESTABLISHMENTFAILURE = '[USERESTABLISHMENT] UserEstablishment Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[USERESTABLISHMENT] Error To Null',
  SUCCESSTONULL = '[USERESTABLISHMENT] Success To Null',
  // Clear state
  CLEARUSERESTABLISHMENT = '[USERESTABLISHMENT] Clear UserEstablishment'
}

export const getUsersEstablishment = createAction(
  ActionTypes.GETUSERSESTABLISHMENT,
  props<{ query: IPagination }>()
);

export const getUsersEstablishmentSuccess = createAction(
  ActionTypes.GETUSERSESTABLISHMENTSUCCESS,
  props<{ data: UserEstablishmentWithPagination }>()
);

export const getUsersEstablishmentOff = createAction(
  ActionTypes.GETUSERSESTABLISHMENTOFF,
  props<{ query: IPagination }>()
);

export const getUsersEstablishmentOffSuccess = createAction(
  ActionTypes.GETUSERSESTABLISHMENTOFFSUCCESS,
  props<{ data: UserEstablishmentWithPagination }>()
);

export const getUsersEstablishmentAll = createAction(
  ActionTypes.GETUSERSESTABLISHMENTALL
);

export const getUsersEstablishmentAllSuccess = createAction(
  ActionTypes.GETUSERSESTABLISHMENTALLSUCCESS,
  props<{ data: UserEstablishmentWithPagination }>()
);

export const getUsersEstablishmentAllClear = createAction(
  ActionTypes.GETUSERSESTABLISHMENTALLCLEAR
);

export const getUsersEstablishmentAllOff = createAction(
  ActionTypes.GETUSERSESTABLISHMENTALLOFF,
  props<{ query: IPagination }>()
);

export const getUsersEstablishmentAllOffSuccess = createAction(
  ActionTypes.GETUSERSESTABLISHMENTALLOFFSUCCESS,
  props<{ data: UserEstablishmentWithPagination }>()
);

export const getUserEstablishmentByDocument = createAction(
  ActionTypes.GETUSERESTABLISHMENTBYDOCUMENT,
  props<{ data: { documentTypeId: number, document: string } }>()
);

export const getUserEstablishmentByDocumentSuccess = createAction(
  ActionTypes.GETUSERESTABLISHMENTBYDOCUMENTSUCCESS,
  props<{ user: UserEstablishment }>()
);

export const getUserEstablishmentByDocumentClear = createAction(
  ActionTypes.GETUSERESTABLISHMENTBYDOCUMENTCLEAR
);

export const getUserEstablishmentByEmail = createAction(
  ActionTypes.GETUSERESTABLISHMENTBYEMAIL,
  props<{ email: string }>()
);

export const getUserEstablishmentByEmailSuccess = createAction(
  ActionTypes.GETUSERESTABLISHMENTBYEMAILSUCCESS,
  props<{ user: UserEstablishment }>()
);

export const getUserEstablishmentByEmailClear = createAction(
  ActionTypes.GETUSERESTABLISHMENTBYEMAILCLEAR
);

export const getUserEstablishmentAppointmentHistory = createAction(
  ActionTypes.GETAPPOINMENTHISTORY,
  props<{ userEstablishment: UserEstablishment }>()
);

export const getUserEstablishmentAppointmentHistorySuccess = createAction(
  ActionTypes.GETAPPOINMENTHISTORYSUCCESS,
  props<{ history: Array<Appointment> }>()
);

export const getOcuppations = createAction(
  ActionTypes.GETOCUPPATIONS
);

export const getOcuppationsSuccess = createAction(
  ActionTypes.GETOCUPPATIONSSUCCESS,
  props<{ occupations: Array<Ocuppation> }>()
);

export const createUserEstablishment = createAction(
  ActionTypes.CREATEUSERESTABLISHMENT,
  props<{ newUser: IUserEstablishmentCreateRequestOrEdit }>()
);

export const createUserEstablishmentSuccess = createAction(
  ActionTypes.CREATEUSERESTABLISHMENTSUCCESS,
  props<{ user: UserEstablishment }>()
);

export const addUserEstablishment = createAction(
  ActionTypes.ADDUSERESTABLISHMENT,
  props<{ newUser: IUserEstablishmentAddRequest }>()
);

export const addUserEstablishmentSuccess = createAction(
  ActionTypes.ADDUSERESTABLISHMENTSUCCESS,
  props<{ user: UserEstablishment }>()
);

export const updateUserEstablishment = createAction(
  ActionTypes.UPDATEUSERESTABLISHMENT,
  props<{ newUser: IUserEstablishmentCreateRequestOrEdit }>()
);

export const updateUserEstablishmentSuccess = createAction(
  ActionTypes.UPDATEUSERESTABLISHMENTSUCCESS,
  props<{ user: UserEstablishment }>()
);

export const deleteUserEstablishment = createAction(
  ActionTypes.DELETEUSERESTABLISHMENT
);

export const deleteUserEstablishmentSuccess = createAction(
  ActionTypes.DELETEUSERESTABLISHMENTSUCCESS,
  props<{ data: VMDelete }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ user: UserEstablishment }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalHistoryOpen = createAction(
  ActionTypes.MODALHISTORYOPEN,
  props<{ user: UserEstablishment }>()
);

export const modalHistoryClose = createAction(
  ActionTypes.MODALHISTORYCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ user: UserEstablishment }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ user: UserEstablishment }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const userEstablishmentSuccess = createAction(
  ActionTypes.USERESTABLISHMENTSUCCESS,
  props<{ data: VMSuccess }>()
);

export const userEstablishmentFailure = createAction(
  ActionTypes.USERESTABLISHMENTFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearUserEstablishment = createAction(
  ActionTypes.CLEARUSERESTABLISHMENT
);
