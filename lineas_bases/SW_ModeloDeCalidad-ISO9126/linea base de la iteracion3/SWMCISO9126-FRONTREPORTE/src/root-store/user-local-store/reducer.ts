import { Action, createReducer, on } from '@ngrx/store';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import * as UserLocalStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(UserLocalStoreActions.getUserLocals, (state: State) => ({
    ...state,
    isLoadingGetUsersLocal: true,
    isLoadingGeneral: true
  })),
  on(UserLocalStoreActions.getUserLocalsSuccess, (state: State, { users }) => ({
    ...state,
    isLoadingGetUsersLocal: false,
    isLoadingGeneral: false,
    usersLocal: users
  })),
  on(UserLocalStoreActions.createUserLocal, (state: State) => ({
    ...state,
    isLoadingCreateUserLocal: true,
    isLoadingGeneral: true
  })),
  on(UserLocalStoreActions.createUserLocalSuccess, (state: State) => ({
    ...state,
    isLoadingCreateUserLocal: false,
    isLoadingGeneral: false
  })),
  on(UserLocalStoreActions.deleteUserLocal, (state: State) => ({
    ...state,
    isLoadingDeleteUserLocal: true,
    isLoadingGeneral: true
  })),
  on(UserLocalStoreActions.deleteUserLocalSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteUserLocal: false,
    isLoadingGeneral: false
  })),
  on(UserLocalStoreActions.updateUserLocal, (state: State) => ({
    ...state,
    isLoadingUpdateUserLocal: true,
    isLoadingGeneral: true
  })),
  on(UserLocalStoreActions.updateUserLocalSuccess, (state: State, { user }) => {
    let buff = null;
    if (Array.isArray(state.usersLocal)) {
      const index = state.usersLocal.findIndex((s: UserLocal) => s.id === user.id);
      buff = [...state.usersLocal];
      if (index !== -1) {
        buff = [...buff.slice(0, index), user, ...buff.slice(index + 1)];
      }
    }

    return {
      ...state,
      usersLocal: buff,
      isLoadingUpdateUserLocal: false,
      isLoadingGeneral: false
    };
  }),
  on(UserLocalStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(UserLocalStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(UserLocalStoreActions.modalDetailOpen, (state: State, { user }) => ({
    ...state,
    modalDetail: true,
    userLocalForDetail: user
  })),
  on(UserLocalStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    userLocalForDetail: null
  })),
  on(UserLocalStoreActions.modalEditOpen, (state: State, { user }) => ({
    ...state,
    modalEdit: true,
    userLocalForEdit: user
  })),
  on(UserLocalStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    userLocalForEdit: null
  })),
  on(UserLocalStoreActions.alertDeleteOpen, (state: State, { user }) => ({
    ...state,
    alertDelete: true,
    userLocalForDelete: user
  })),
  on(UserLocalStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    userLocalForDelete: null
  })),
  on(UserLocalStoreActions.userLocalFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(UserLocalStoreActions.userLocalSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(UserLocalStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(UserLocalStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(UserLocalStoreActions.clearUserLocal, (state: State) => ({
    usersLocal: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    alertDelete: false,
    userLocalForEdit: null,
    userLocalForDetail: null,
    userLocalForDelete: null,
    error: null,
    success: null,
    isLoadingGetUsersLocal: false,
    isLoadingCreateUserLocal: false,
    isLoadingUpdateUserLocal: false,
    isLoadingDeleteUserLocal: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function userLocalReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
