import { Action, createReducer, on } from '@ngrx/store';
import { UserApp } from '@shared/models/user-app/user-app.class';
import * as UserAppStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(UserAppStoreActions.getUsersApp, (state: State, { query }) => ({
    ...state,
    isLoadingGetUsersApp: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(UserAppStoreActions.getUsersAppSuccess, (state: State, { usersApp }) => ({
    ...state,
    isLoadingGetUsersApp: false,
    isLoadingGeneral: false,
    currentPage: usersApp.page,
    itemsPerPage: usersApp.perPage,
    totalRecords: usersApp.totalRecords,
    usersApp: usersApp.data
  })),
  on(UserAppStoreActions.getUsersAppByEmail, (state: State) => ({
    ...state,
    isLoadingGetUsersAppByEmail: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.getUsersAppByEmailSuccess, (state: State, { usersApp }) => ({
    ...state,
    isLoadingGetUsersAppByEmail: false,
    isLoadingGeneral: false,
    usersAppByEmail: usersApp
  })),
  on(UserAppStoreActions.getUsersAppByEmailClear, (state: State) => ({
    ...state,
    isLoadingGetUsersAppByEmail: false,
    isLoadingGeneral: false,
    usersAppByEmail: null
  })),
  on(UserAppStoreActions.getUsersAppByEmailOrNames, (state: State) => ({
    ...state,
    isLoadingGetUsersAppByEmailOrNames: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.getUsersAppByEmailOrNamesSuccess, (state: State, { usersApp }) => ({
    ...state,
    isLoadingGetUsersAppByEmailOrNames: false,
    isLoadingGeneral: false,
    usersAppByEmailOrNames: usersApp
  })),
  on(UserAppStoreActions.getUsersAppByEmailOrNamesClear, (state: State) => ({
    ...state,
    isLoadingGetUsersAppByEmailOrNames: false,
    isLoadingGeneral: false,
    usersAppByEmailOrNames: null
  })),
  on(UserAppStoreActions.getUserAppByDocument, (state: State) => ({
    ...state,
    isLoadingGetUserAppByDocument: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.getUserAppByDocumentSuccess, (state: State, { user }) => ({
    ...state,
    isLoadingGetUserAppByDocument: false,
    isLoadingGeneral: false,
    userAppByDocument: user
  })),
  on(UserAppStoreActions.getUserAppByDocumentClear, (state: State) => ({
    ...state,
    isLoadingGetUserAppByDocument: false,
    isLoadingGeneral: false,
    userAppByDocument: null
  })),
  on(UserAppStoreActions.getUserAppByEmail, (state: State) => ({
    ...state,
    isLoadingGetUserAppByEmail: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.getUserAppByEmailSuccess, (state: State, { userApp }) => ({
    ...state,
    isLoadingGetUserAppByEmail: false,
    isLoadingGeneral: false,
    userAppByEmail: userApp
  })),
  on(UserAppStoreActions.getUserAppByEmailClear, (state: State) => ({
    ...state,
    isLoadingGetUserAppByEmail: false,
    isLoadingGeneral: false,
    userAppByEmail: null
  })),
  on(UserAppStoreActions.getUserAppointmentHistory, (state: State) => ({
    ...state,
    isLoadingGetUserAppointmentHistory: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.getUserAppointmentHistorySuccess, (state: State, { history }) => ({
    ...state,
    isLoadingGetUserAppointmentHistory: false,
    isLoadingGeneral: false,
    userAppointmentHistory: history
  })),
  on(UserAppStoreActions.getUserProductHistory, (state: State) => ({
    ...state,
    isLoadingGetUserProductHistory: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.getUserProductHistorySuccess, (state: State, { history }) => ({
    ...state,
    isLoadingGetUserProductHistory: false,
    isLoadingGeneral: false,
    userProductHistory: history
  })),
  on(UserAppStoreActions.createUserApp, (state: State) => ({
    ...state,
    isLoadingCreateUserApp: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.createUserAppSuccess, (state: State) => ({
    ...state,
    isLoadingCreateUserApp: false,
    isLoadingGeneral: false
  })),
  on(UserAppStoreActions.deleteUserApp, (state: State) => ({
    ...state,
    isLoadingDeleteUserApp: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.deleteUserAppSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteUserApp: false,
    isLoadingGeneral: false
  })),
  on(UserAppStoreActions.addUserApp, (state: State) => ({
    ...state,
    isLoadingCreateUserApp: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.addUserAppSuccess, (state: State) => ({
    ...state,
    isLoadingCreateUserApp: false,
    isLoadingGeneral: false
  })),
  on(UserAppStoreActions.updateUserApp, (state: State) => ({
    ...state,
    isLoadingUpdateUserApp: true,
    isLoadingGeneral: true
  })),
  on(UserAppStoreActions.updateUserAppSuccess, (state: State, { userApp }) => {
    let buff = null;
    if (Array.isArray(state.usersApp)) {
      const index = state.usersApp.findIndex((s: UserApp) => s.id === userApp.id);
      buff = [...state.usersApp];
      if (index !== -1) {
        buff = [...buff.slice(0, index), userApp, ...buff.slice(index + 1)];
      }
    }

    return {
      ...state,
      usersApp: buff,
      isLoadingUpdateUserApp: false,
      isLoadingGeneral: false
    };
  }),
  on(UserAppStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(UserAppStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(UserAppStoreActions.modalDetailOpen, (state: State, { userApp }) => ({
    ...state,
    modalDetail: true,
    userAppForDetail: userApp
  })),
  on(UserAppStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    userAppForDetail: null
  })),
  on(UserAppStoreActions.modalHistoryOpen, (state: State, { userApp }) => ({
    ...state,
    modalHistory: true,
    userAppForHistory: userApp
  })),
  on(UserAppStoreActions.modalHistoryClose, (state: State) => ({
    ...state,
    modalHistory: false,
    userAppForHistory: null,
    userAppointmentHistory: null,
    userProductHistory: null
  })),
  on(UserAppStoreActions.modalEditOpen, (state: State, { userApp }) => ({
    ...state,
    modalEdit: true,
    userAppForEdit: userApp
  })),
  on(UserAppStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    userAppForEdit: null
  })),
  on(UserAppStoreActions.alertDeleteOpen, (state: State, { userApp }) => ({
    ...state,
    alertDelete: true,
    userAppForDelete: userApp
  })),
  on(UserAppStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    userAppForDelete: null
  })),
  on(UserAppStoreActions.userAppFailure, (state: State, { data }) => ({
    ...state,
    isLoadingGetUsersApp: false,
    isLoadingGetUserAppByEmail: false,
    isLoadingGetUsersAppByEmail: false,
    isLoadingGetUserAppByDocument: false,
    isLoadingCreateUserApp: false,
    isLoadingUpdateUserApp: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(UserAppStoreActions.userAppSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(UserAppStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(UserAppStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(UserAppStoreActions.clearUserApp, (state: State) => ({
    usersApp: null,
    usersAppByEmail: null,
    usersAppByEmailOrNames: null,
    userAppByDocument: null,
    userAppByEmail: null,
    itemsPerPage: null,
    currentPage: null,
    totalRecords: null,
    query: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    modalHistory: false,
    alertDelete: false,
    userAppForDetail: null,
    userAppForEdit: null,
    userAppForDelete: null,
    userAppForHistory: null,
    userAppointmentHistory: null,
    userProductHistory: null,
    error: null,
    success: null,
    isLoadingGetUsersApp: false,
    isLoadingGetUsersAppByEmail: false,
    isLoadingGetUsersAppByEmailOrNames: false,
    isLoadingGetUserAppByDocument: false,
    isLoadingGetUserAppByEmail: false,
    isLoadingGetUserAppointmentHistory: false,
    isLoadingGetUserProductHistory: false,
    isLoadingCreateUserApp: false,
    isLoadingUpdateUserApp: false,
    isLoadingDeleteUserApp: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function userAppReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
