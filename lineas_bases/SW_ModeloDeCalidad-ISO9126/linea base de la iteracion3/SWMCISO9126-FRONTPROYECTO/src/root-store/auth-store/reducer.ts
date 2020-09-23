import { Action, createReducer, on } from '@ngrx/store';
import * as AuthStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(AuthStoreActions.login, (state: State) => ({
    ...state,
    isLoading: true
  })),
  on(AuthStoreActions.loginSuccess, (state: State, { auth }) => ({
    ...state,
    isAuthenticated: true,
    token: auth.token,
    user: auth.user,
    isLoading: false
  })),
  on(AuthStoreActions.signin, (state: State) => ({
    ...state,
    isLoading: true
  })),
  on(AuthStoreActions.signinSuccess, (state: State, { data }) => ({
    ...state,
    isLoading: false,
    success: data.message
  })),
  on(AuthStoreActions.verifyEmail, (state: State) => ({
    ...state,
    isLoading: true
  })),
  on(AuthStoreActions.verifyEmailFailure, (state: State, { data }) => ({
    ...state,
    isLoading: false,
    error: data.message
  })),
  on(AuthStoreActions.verifyEmailSuccess, (state: State, { data }) => ({
    ...state,
    isLoading: false,
    success: data.message
  })),
  on(AuthStoreActions.logout, (state: State, { data }) => ({
    ...state,
    success: data.message,
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false
  })),
  on(AuthStoreActions.authFailure, (state: State, { data }) => ({
    ...state,
    isLoading: false,
    error: data.message
  })),
  on(AuthStoreActions.authSuccess, (state: State, { data }) => ({
    ...state,
    isLoading: false,
    success: data.message
  })),
  on(AuthStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(AuthStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function authReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
