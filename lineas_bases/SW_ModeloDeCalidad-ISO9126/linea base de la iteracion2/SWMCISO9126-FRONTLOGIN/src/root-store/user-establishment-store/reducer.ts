import { _chunck } from '@core/common/helpers-array';
import { Action, createReducer, on } from '@ngrx/store';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';
import * as UserEstablishmentStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(UserEstablishmentStoreActions.getUsersEstablishment, (state: State, { query }) => ({
    ...state,
    isLoadingGetUsersEstablishment: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentSuccess, (state: State, { data }) => ({
    ...state,
    isLoadingGetUsersEstablishment: false,
    isLoadingGeneral: false,
    currentPage: data.page,
    itemsPerPage: data.perPage,
    totalRecords: data.totalRecords,
    usersEstablishment: data.data
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetUsersEstablishment: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentOffSuccess, (state: State, { data }) => ({
    ...state,
    isLoadingGetUsersEstablishment: false,
    isLoadingGeneral: false,
    currentPage: data.page,
    itemsPerPage: data.perPage,
    totalRecords: data.totalRecords,
    usersEstablishment: data.data
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentAll, (state: State) => ({
    ...state,
    isLoadingGetUsersEstablishmentAll: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentAllSuccess, (state: State, { data }) => ({
    ...state,
    isLoadingGetUsersEstablishmentAll: false,
    isLoadingGeneral: false,
    usersEstablishmentAll: data.data
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentAllClear, (state: State) => ({
    ...state,
    isLoadingGetUsersEstablishmentAll: false,
    isLoadingGeneral: false,
    usersEstablishmentAll: null
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentAllOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetUsersEstablishmentAll: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(UserEstablishmentStoreActions.getUsersEstablishmentAllOffSuccess, (state: State, { data }) => {
    let usersEstablishment = [];
    const usersEstablishmentBuff = _chunck(data.data, data.perPage);
    if (usersEstablishmentBuff.length >= data.page && data.page > 0) {
      usersEstablishment = usersEstablishmentBuff[data.page - 1];
    }

    return {
      ...state,
      isLoadingGetUsersEstablishmentAll: false,
      isLoadingGeneral: false,
      usersEstablishmentAll: data.data,
      currentPage: data.page,
      itemsPerPage: data.perPage,
      totalRecords: data.totalRecords,
      usersEstablishment
    };
  }),
  on(UserEstablishmentStoreActions.getUserEstablishmentByDocument, (state: State) => ({
    ...state,
    isLoadingGetUserEstablishmentByDocument: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentByDocumentSuccess, (state: State, { user }) => ({
    ...state,
    isLoadingGetUserEstablishmentByDocument: false,
    isLoadingGeneral: false,
    userEstablishmentByDocument: user
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentByDocumentClear, (state: State) => ({
    ...state,
    isLoadingGetUserEstablishmentByDocument: false,
    isLoadingGeneral: false,
    userEstablishmentByDocument: null
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentByEmail, (state: State) => ({
    ...state,
    isLoadingGetUserEstablishmentByEmail: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentByEmailSuccess, (state: State, { user }) => ({
    ...state,
    isLoadingGetUserEstablishmentByEmail: false,
    isLoadingGeneral: false,
    userEstablishmentByEmail: user
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentByEmailClear, (state: State) => ({
    ...state,
    isLoadingGetUserEstablishmentByEmail: false,
    isLoadingGeneral: false,
    userEstablishmentByEmail: null
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentAppointmentHistory, (state: State) => ({
    ...state,
    isLoadingGetUserEstablishmentAppointmentHistory: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.getUserEstablishmentAppointmentHistorySuccess, (state: State, { history }) => ({
    ...state,
    isLoadingGetUserEstablishmentAppointmentHistory: false,
    isLoadingGeneral: false,
    userEstablishmentAppointmentHistory: history
  })),
  on(UserEstablishmentStoreActions.createUserEstablishmentSuccess, (state: State) => ({
    ...state,
    isLoadingCreateUserEstablishment: false,
    isLoadingGeneral: false
  })),
  on(UserEstablishmentStoreActions.deleteUserEstablishment, (state: State) => ({
    ...state,
    isLoadingDeleteUserEstablishment: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.deleteUserEstablishmentSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteUserEstablishment: false,
    isLoadingGeneral: false
  })),
  on(UserEstablishmentStoreActions.addUserEstablishment, (state: State) => ({
    ...state,
    isLoadingCreateUserEstablishment: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.addUserEstablishmentSuccess, (state: State) => ({
    ...state,
    isLoadingCreateUserEstablishment: false,
    isLoadingGeneral: false
  })),
  on(UserEstablishmentStoreActions.updateUserEstablishment, (state: State) => ({
    ...state,
    isLoadingUpdateUserEstablishment: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.updateUserEstablishmentSuccess, (state: State, { user }) => {
    let buff = null;
    let buffAll = null;
    if (Array.isArray(state.usersEstablishment)) {
      const index = state.usersEstablishment.findIndex((s: UserEstablishment) => s.id === user.id);
      buff = [...state.usersEstablishment];
      if (index !== -1) {
        buff = [...buff.slice(0, index), user, ...buff.slice(index + 1)];
      }
    }
    if (Array.isArray(state.usersEstablishmentAll)) {
      const indexAll = state.usersEstablishmentAll.findIndex((s: UserEstablishment) => s.id === user.id);
      buffAll = [...state.usersEstablishmentAll];
      if (indexAll !== -1) {
        buffAll = [...buffAll.slice(0, indexAll), user, ...buffAll.slice(indexAll + 1)];
      }
    }

    return {
      ...state,
      usersEstablishment: buff,
      usersEstablishmentAll: buffAll,
      isLoadingUpdateUserEstablishment: false,
      isLoadingGeneral: false
    };
  }),
  on(UserEstablishmentStoreActions.getOcuppations, (state: State) => ({
    ...state,
    isLoadingGetOcuppations: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentStoreActions.getOcuppationsSuccess, (state: State, { occupations }) => ({
    ...state,
    isLoadingGetOcuppations: false,
    isLoadingGeneral: false,
    ocuppations: occupations
  })),
  on(UserEstablishmentStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(UserEstablishmentStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(UserEstablishmentStoreActions.modalDetailOpen, (state: State, { user }) => ({
    ...state,
    modalDetail: true,
    userEstablishmentForDetail: user
  })),
  on(UserEstablishmentStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    userEstablishmentForDetail: null
  })),
  on(UserEstablishmentStoreActions.modalHistoryOpen, (state: State, { user }) => ({
    ...state,
    modalHistory: true,
    userEstablishmentForHistory: user
  })),
  on(UserEstablishmentStoreActions.modalHistoryClose, (state: State) => ({
    ...state,
    modalHistory: false,
    userEstablishmentForHistory: null,
    userEstablishmentAppointmentHistory: null
  })),
  on(UserEstablishmentStoreActions.modalEditOpen, (state: State, { user }) => ({
    ...state,
    modalEdit: true,
    userEstablishmentForEdit: user
  })),
  on(UserEstablishmentStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    userEstablishmentForEdit: null
  })),
  on(UserEstablishmentStoreActions.alertDeleteOpen, (state: State, { user }) => ({
    ...state,
    alertDelete: true,
    userEstablishmentForDelete: user
  })),
  on(UserEstablishmentStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    userEstablishmentForDelete: null
  })),
  on(UserEstablishmentStoreActions.userEstablishmentFailure, (state: State, { data }) => ({
    ...state,
    isLoadingGetUsersEstablishment: false,
    isLoadingGetUserEstablishmentByDocument: false,
    isLoadingGetOcuppations: false,
    isLoadingCreateUserEstablishment: false,
    isLoadingUpdateUserEstablishment: false,
    isLoadingDeleteUserEstablishment: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(UserEstablishmentStoreActions.userEstablishmentSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(UserEstablishmentStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(UserEstablishmentStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(UserEstablishmentStoreActions.clearUserEstablishment, (state: State) => ({
    usersEstablishment: null,
    usersEstablishmentAll: null,
    userEstablishmentByDocument: null,
    userEstablishmentByEmail: null,
    itemsPerPage: null,
    currentPage: null,
    totalRecords: null,
    query: null,
    ocuppations: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    modalHistory: false,
    alertDelete: false,
    userEstablishmentForEdit: null,
    userEstablishmentForDetail: null,
    userEstablishmentForHistory: null,
    userEstablishmentForDelete: null,
    userEstablishmentAppointmentHistory: null,
    error: null,
    success: null,
    isLoadingGetUsersEstablishment: false,
    isLoadingGetUsersEstablishmentAll: false,
    isLoadingGetUserEstablishmentByDocument: false,
    isLoadingGetUserEstablishmentByEmail: false,
    isLoadingGetUserEstablishmentAppointmentHistory: false,
    isLoadingGetOcuppations: false,
    isLoadingCreateUserEstablishment: false,
    isLoadingUpdateUserEstablishment: false,
    isLoadingDeleteUserEstablishment: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function userEstablishmentReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
