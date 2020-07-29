import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createAction, props } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IProductVoucher } from '@shared/models/product/product.interface';
import { UserApp, UserAppWithPagination } from '@shared/models/user-app/user-app.class';
import { IUserAppCreateRequestOrEdit } from '@shared/models/user-app/user-app.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETUSERSAPP = '[USERAPP] Get Users App',
  GETUSERSAPPSUCCESS = '[USERAPP] Get Users App Success',
  GETUSERSAPPBYEMAIL = '[USERAPP] Get Users App By Email',
  GETUSERSAPPBYEMAILSUCCESS = '[USERAPP] Get Users App By Email Success',
  GETUSERSAPPBYEMAILCLEAR = '[USERAPP] Get Users App By Email Clear',
  GETUSERSAPPBYEMAILORNAMES = '[USERAPP] Get Users App By Email Or Names',
  GETUSERSAPPBYEMAILORNAMESSUCCESS = '[USERAPP] Get Users App By Email Or Names Success',
  GETUSERSAPPBYEMAILORNAMESCLEAR = '[USERAPP] Get Users App By Email Or Names Clear',
  GETUSERAPPBYDOCUMENT = '[USERAPP] Get User App by document',
  GETUSERAPPBYDOCUMENTSUCCESS = '[USERAPP] Get User App by document Success',
  GETUSERAPPBYDOCUMENTCLEAR = '[USERAPP] Get User App by document Clear',
  GETUSERAPPBYEMAIL = '[USERAPP] Get User App by email',
  GETUSERAPPBYEMAILSUCCESS = '[USERAPP] Get User App by email Success',
  GETUSERAPPBYEMAILCLEAR = '[USERAPP] Get User App by email Clear',
  GETUSERAPPOINTMENTHISTORY = '[USERAPP] Get User Appointment history',
  GETUSERAPPOINTMENTHISTORYSUCCESS = '[USERAPP] Get User Appointment history Success',
  GETUSERPRODUCTHISTORY = '[USERAPP] Get User Product history',
  GETUSERPRODUCTHISTORYSUCCESS = '[USERAPP] Get User Product history Success',
  CREATEUSERAPP = '[USERAPP] Create User App',
  CREATEUSERAPPSUCCESS = '[USERAPP] Create User App Success',
  ADDUSERAPP = '[USERAPP] Add User App',
  ADDUSERAPPSUCCESS = '[USERAPP] Add User App Success',
  UPDATEUSERAPP = '[USERAPP] Update User App',
  UPDATEUSERAPPSUCCESS = '[USERAPP] Update User App Success',
  DELETEUSERAPP = '[USERAPP] Delete User App',
  DELETEUSERAPPSUCCESS = '[USERAPP] Delete User App Success',
  // Events for modal
  MODALCREATEOPEN = '[USERAPP] Modal Create Open',
  MODALCREATECLOSE = '[USERAPP] Modal Create Close',
  MODALDETAILOPEN = '[USERAPP] Modal Detail Open',
  MODALDETAILCLOSE = '[USERAPP] Modal Detail Close',
  MODALEDITOPEN = '[USERAPP] Modal Edit Open',
  MODALHISTORYOPEN = '[USERAPP] Modal History Open',
  MODALHISTORYCLOSE = '[USERAPP] Modal History Close',
  MODALEDITCLOSE = '[USERAPP] Modal Edit Close',
  ALERTDELETEOPEN = '[USERAPP] Alert Delete Open',
  ALERTDELETECLOSE = '[USERAPP] Alert Delete Close',
  // Error global User App
  USERAPPSUCCESS = '[USERAPP] User App Success',
  USERAPPFAILURE = '[USERAPP] User App Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[USERAPP] Error To Null',
  SUCCESSTONULL = '[USERAPP] Success To Null',
  // Clear state
  CLEARUSERAPP = '[USERAPP] Clear User App'
}

export const getUsersApp = createAction(
  ActionTypes.GETUSERSAPP,
  props<{ query: IPagination }>()
);

export const getUsersAppSuccess = createAction(
  ActionTypes.GETUSERSAPPSUCCESS,
  props<{ usersApp: UserAppWithPagination }>()
);

export const getUsersAppByEmail = createAction(
  ActionTypes.GETUSERSAPPBYEMAIL,
  props<{ email: string }>()
);

export const getUsersAppByEmailSuccess = createAction(
  ActionTypes.GETUSERSAPPBYEMAILSUCCESS,
  props<{ usersApp: Array<UserApp> }>()
);

export const getUsersAppByEmailClear = createAction(
  ActionTypes.GETUSERSAPPBYEMAILCLEAR
);

export const getUsersAppByEmailOrNames = createAction(
  ActionTypes.GETUSERSAPPBYEMAILORNAMES,
  props<{ email: string }>()
);

export const getUsersAppByEmailOrNamesSuccess = createAction(
  ActionTypes.GETUSERSAPPBYEMAILORNAMESSUCCESS,
  props<{ usersApp: Array<UserApp> }>()
);

export const getUsersAppByEmailOrNamesClear = createAction(
  ActionTypes.GETUSERSAPPBYEMAILORNAMESCLEAR
);

export const getUserAppByDocument = createAction(
  ActionTypes.GETUSERAPPBYDOCUMENT,
  props<{ query: { documentTypeId: number, document: string } }>()
);

export const getUserAppByDocumentSuccess = createAction(
  ActionTypes.GETUSERAPPBYDOCUMENTSUCCESS,
  props<{ user: UserApp }>()
);

export const getUserAppByDocumentClear = createAction(
  ActionTypes.GETUSERAPPBYDOCUMENTCLEAR
);

export const getUserAppByEmail = createAction(
  ActionTypes.GETUSERAPPBYEMAIL,
  props<{ email: string }>()
);

export const getUserAppByEmailSuccess = createAction(
  ActionTypes.GETUSERAPPBYEMAILSUCCESS,
  props<{ userApp: UserApp }>()
);

export const getUserAppByEmailClear = createAction(
  ActionTypes.GETUSERAPPBYEMAILCLEAR
);

export const getUserAppointmentHistory = createAction(
  ActionTypes.GETUSERAPPOINTMENTHISTORY,
  props<{ userApp: UserApp }>()
);

export const getUserAppointmentHistorySuccess = createAction(
  ActionTypes.GETUSERAPPOINTMENTHISTORYSUCCESS,
  props<{ history: Array<Appointment> }>()
);

export const getUserProductHistory = createAction(
  ActionTypes.GETUSERPRODUCTHISTORY,
  props<{ userApp: UserApp }>()
);

export const getUserProductHistorySuccess = createAction(
  ActionTypes.GETUSERPRODUCTHISTORYSUCCESS,
  props<{ history: Array<IProductVoucher> }>()
);

export const createUserApp = createAction(
  ActionTypes.CREATEUSERAPP,
  props<{ newUserApp: IUserAppCreateRequestOrEdit }>()
);

export const createUserAppSuccess = createAction(
  ActionTypes.CREATEUSERAPPSUCCESS,
  props<{ userApp: UserApp }>()
);

export const addUserApp = createAction(
  ActionTypes.ADDUSERAPP,
  props<{ userAppId: number }>()
);

export const addUserAppSuccess = createAction(
  ActionTypes.ADDUSERAPPSUCCESS,
  props<{ userApp: UserApp }>()
);

export const updateUserApp = createAction(
  ActionTypes.UPDATEUSERAPP,
  props<{ newUserApp: IUserAppCreateRequestOrEdit }>()
);

export const updateUserAppSuccess = createAction(
  ActionTypes.UPDATEUSERAPPSUCCESS,
  props<{ userApp: UserApp }>()
);

export const deleteUserApp = createAction(
  ActionTypes.DELETEUSERAPP
);

export const deleteUserAppSuccess = createAction(
  ActionTypes.DELETEUSERAPPSUCCESS,
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
  props<{ userApp: UserApp }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ userApp: UserApp }>()
);

export const modalHistoryOpen = createAction(
  ActionTypes.MODALHISTORYOPEN,
  props<{ userApp: UserApp }>()
);

export const modalHistoryClose = createAction(
  ActionTypes.MODALHISTORYCLOSE
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ userApp: UserApp }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const userAppSuccess = createAction(
  ActionTypes.USERAPPSUCCESS,
  props<{ data: VMSuccess }>()
);

export const userAppFailure = createAction(
  ActionTypes.USERAPPFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearUserApp = createAction(
  ActionTypes.CLEARUSERAPP
);
