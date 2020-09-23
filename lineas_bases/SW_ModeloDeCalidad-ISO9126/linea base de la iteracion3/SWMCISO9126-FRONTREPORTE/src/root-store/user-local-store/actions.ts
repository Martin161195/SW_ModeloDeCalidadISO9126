import { createAction, props } from '@ngrx/store';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import { IUserLocalCreateRequestOrEdit } from '@shared/models/user-local/user-local.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETUSERSLOCAL = '[USERLOCAL] Get UsersLocal',
  GETUSERSLOCALSUCCESS = '[USERLOCAL] Get UsersLocal Success',
  CREATEUSERLOCAL = '[USERLOCAL] Create UserLocal',
  CREATEUSERLOCALSUCCESS = '[USERLOCAL] Create UserLocal Success',
  UPDATEUSERLOCAL = '[USERLOCAL] Update UserLocal',
  UPDATEUSERLOCALSUCCESS = '[USERLOCAL] Update UserLocal Success',
  DELETEUSERLOCAL = '[USERLOCAL] Delete UserLocal',
  DELETEUSERLOCALSUCCESS = '[USERLOCAL] Delete UserLocal Success',
  // Events for modal
  MODALCREATEOPEN = '[USERLOCAL] Modal Create Open',
  MODALCREATECLOSE = '[USERLOCAL] Modal Create Close',
  MODALDETAILOPEN = '[USERLOCAL] Modal Detail Open',
  MODALDETAILCLOSE = '[USERLOCAL] Modal Detail Close',
  MODALEDITOPEN = '[USERLOCAL] Modal Edit Open',
  MODALEDITCLOSE = '[USERLOCAL] Modal Edit Close',
  ALERTDELETEOPEN = '[USERLOCAL] Alert Delete Open',
  ALERTDELETECLOSE = '[USERLOCAL] Alert Delete Close',
  // Error global role
  USERLOCALSUCCESS = '[USERLOCAL] UserLocal Success',
  USERLOCALFAILURE = '[USERLOCAL] UserLocal Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[USERLOCAL] Error To Null',
  SUCCESSTONULL = '[USERLOCAL] Success To Null',
  // Clear state
  CLEARUSERLOCAL = '[USERLOCAL] Clear UserLocal'
}

export const getUserLocals = createAction(
  ActionTypes.GETUSERSLOCAL
);

export const getUserLocalsSuccess = createAction(
  ActionTypes.GETUSERSLOCALSUCCESS,
  props<{ users: Array<UserLocal> }>()
);

export const createUserLocal = createAction(
  ActionTypes.CREATEUSERLOCAL,
  props<{ newUser: IUserLocalCreateRequestOrEdit }>()
);

export const createUserLocalSuccess = createAction(
  ActionTypes.CREATEUSERLOCALSUCCESS,
  props<{ user: UserLocal }>()
);

export const updateUserLocal = createAction(
  ActionTypes.UPDATEUSERLOCAL,
  props<{ newUser: IUserLocalCreateRequestOrEdit }>()
);

export const updateUserLocalSuccess = createAction(
  ActionTypes.UPDATEUSERLOCALSUCCESS,
  props<{ user: UserLocal }>()
);

export const deleteUserLocal = createAction(
  ActionTypes.DELETEUSERLOCAL
);

export const deleteUserLocalSuccess = createAction(
  ActionTypes.DELETEUSERLOCALSUCCESS,
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
  props<{ user: UserLocal }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ user: UserLocal }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ user: UserLocal }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const userLocalSuccess = createAction(
  ActionTypes.USERLOCALSUCCESS,
  props<{ data: VMSuccess }>()
);

export const userLocalFailure = createAction(
  ActionTypes.USERLOCALFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearUserLocal = createAction(
  ActionTypes.CLEARUSERLOCAL
);
