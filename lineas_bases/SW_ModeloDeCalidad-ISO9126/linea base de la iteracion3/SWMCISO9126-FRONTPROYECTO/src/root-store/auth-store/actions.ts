import { createAction, props } from '@ngrx/store';
import { AuthUserLocal } from '@shared/models/user-local/user-local.class';
import {
  IUserLocalLoginRequest,
  IUserLocalSigninRequest
} from '@shared/models/user-local/user-local.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  LOGIN = '[AUTH] Login',
  LOGINSUCESS = '[AUTH] Login Success',
  SIGNIN = '[AUTH] Signin',
  SIGNINSUCCESS = '[AUTH] Signin Success',
  VERIFYEMAIL = '[AUTH] Verify Email',
  VERIFYEMAILSUCCESS = '[AUTH] Verify Email Success',
  VERIFYEMAILFAILURE = '[AUTH] Verify Email Failure',
  // General Error in Auth
  AUTHFAILURE = '[AUTH] Auth Failure',
  // General success message in Auth
  AUTHSUCCESS = '[AUTH] Auth Success',
  LOGOUT = '[AUTH] Logout',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[AUTH] Error To Null',
  SUCCESSTONULL = '[AUTH] Success To Null'
}

export const login = createAction(
  ActionTypes.LOGIN,
  props<{ credentials: IUserLocalLoginRequest }>()
);

export const loginSuccess = createAction(
  ActionTypes.LOGINSUCESS,
  props<{ auth: AuthUserLocal }>()
);

export const signin = createAction(
  ActionTypes.SIGNIN,
  props<{ data: IUserLocalSigninRequest }>()
);

export const signinSuccess = createAction(
  ActionTypes.SIGNINSUCCESS,
  props<{ data: VMSuccess }>()
);

export const verifyEmail = createAction(
  ActionTypes.VERIFYEMAIL,
  props<{ token: string }>()
);

export const verifyEmailSuccess = createAction(
  ActionTypes.VERIFYEMAILSUCCESS,
  props<{ data: VMSuccess }>()
);

export const verifyEmailFailure = createAction(
  ActionTypes.VERIFYEMAILFAILURE,
  props<{ data: VMError }>()
);

export const authFailure = createAction(
  ActionTypes.AUTHFAILURE,
  props<{ data: VMError }>()
);

export const authSuccess = createAction(
  ActionTypes.AUTHSUCCESS,
  props<{ data: VMSuccess }>()
);

export const logout = createAction(
  ActionTypes.LOGOUT,
  props<{ data: VMSuccess }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);
