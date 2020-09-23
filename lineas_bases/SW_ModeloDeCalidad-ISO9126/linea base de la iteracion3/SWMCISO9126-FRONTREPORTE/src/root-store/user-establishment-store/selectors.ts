import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Ocuppation } from '@shared/models/ocuppation/ocuppation.class';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetUsersEstablishment = (state: State): boolean => state.isLoadingGetUsersEstablishment;

const getIsLoadingGetUsersEstablishmentAll = (state: State): boolean => state.isLoadingGetUsersEstablishmentAll;

const getIsLoadingGetUserEstablishmentByDocument = (state: State): boolean => state.isLoadingGetUserEstablishmentByDocument;

const getIsLoadingGetUserEstablishmentByEmail = (state: State): boolean => state.isLoadingGetUserEstablishmentByEmail;

const getIsLoadingGetUserEstablishmenAppoinmentHistory = (state: State): boolean => state.isLoadingGetUserEstablishmentAppointmentHistory;

const getIsLoadingCreateUserEstablishment = (state: State): boolean => state.isLoadingCreateUserEstablishment;

const getIsLoadingUpdateUserEstablishment = (state: State): boolean => state.isLoadingUpdateUserEstablishment;

const getIsLoadingDeleteUserEstablishment = (state: State): boolean => state.isLoadingDeleteUserEstablishment;

const getIsLoadingOcuppations = (state: State): boolean => state.isLoadingGetOcuppations;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getUsersEstablishment = (state: State): Array<UserEstablishment> | null => state.usersEstablishment;

const getUsersEstablishmentAll = (state: State): Array<UserEstablishment> | null => state.usersEstablishmentAll;

const getUserEstablishmentByDocument = (state: State): UserEstablishment | null => state.userEstablishmentByDocument;

const getUserEstablishmentByEmail = (state: State): UserEstablishment | null => state.userEstablishmentByEmail;

const getUserEstablishmentForDelete = (state: State): UserEstablishment | null => state.userEstablishmentForDelete;

const getUserEstablishmentForDetail = (state: State): UserEstablishment | null => state.userEstablishmentForDetail;

const getUserEstablishmentForHistory = (state: State): UserEstablishment | null => state.userEstablishmentForHistory;

const getUserEstablishmentForEdit = (state: State): UserEstablishment | null => state.userEstablishmentForEdit;

const getUserEstablishmentAppointmentHistory = (state: State): Array<Appointment> | null => state.userEstablishmentAppointmentHistory;

const getOcuppations = (state: State): Array<Ocuppation> | null => state.ocuppations;

const getItemsPerPage = (state: State): number | null => state.itemsPerPage;

const getCurrentPage = (state: State): number | null => state.currentPage;

const getTotalRecords = (state: State): number | null => state.totalRecords;

const getQuery = (state: State): IPagination => state.query;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalHistory = (state: State): boolean => state.modalHistory;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectUserEstablishmentState: MemoizedSelector<object, State> = createFeatureSelector<State>('user-establishment');

export const selectUserEstablishmentError: MemoizedSelector<object, string | null> = createSelector(
  selectUserEstablishmentState,
  getError
);

export const selectUserEstablishmentSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectUserEstablishmentState,
  getSuccess
);

export const selectUserEstablishmentIsLoadingGetUsersEstablishment: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingGetUsersEstablishment
);

export const selectIsLoadingGetUsersEstablishmentAll: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingGetUsersEstablishmentAll
);

export const selectIsLoadingGetUserEstablishmentByDocument: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingGetUserEstablishmentByDocument
);

export const selectIsLoadingGetUserEstablishmentByEmail: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingGetUserEstablishmentByEmail
);

export const selectIsLoadingGetUserEstablishmentAppoinmentHistory: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingGetUserEstablishmenAppoinmentHistory
);

export const selectUserEstablishmentIsLoadingCreateUserEstablishment: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingCreateUserEstablishment
);

export const selectUserEstablishmentIsLoadingUpdateUserEstablishment: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingUpdateUserEstablishment
);

export const selectUserEstablishmentIsLoadingDeleteUserEstablishment: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingDeleteUserEstablishment
);

export const selectUserEstablishmentIsLoadingGetOcuppations: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingOcuppations
);

export const selectUserEstablishmentIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getIsLoadingGeneral
);

export const selectUsersEstablishment: MemoizedSelector<object, Array<UserEstablishment> | null> = createSelector(
  selectUserEstablishmentState,
  getUsersEstablishment
);

export const selectUsersEstablishmentAll: MemoizedSelector<object, Array<UserEstablishment> | null> = createSelector(
  selectUserEstablishmentState,
  getUsersEstablishmentAll
);

export const selectUserEstablishmentByDocument: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentByDocument
);

export const selectUserEstablishmentByEmail: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentByEmail
);

export const selectUserEstablishmentForDelete: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentForDelete
);

export const selectUserEstablishmentForDetail: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentForDetail
);

export const selectUserEstablishmentForHistory: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentForHistory
);

export const selectUserEstablishmentForEdit: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentForEdit
);

export const selectUserEstablishmentAppointmentHistory: MemoizedSelector<object, Array<Appointment> | null> = createSelector(
  selectUserEstablishmentState,
  getUserEstablishmentAppointmentHistory
);

export const selectOcuppations: MemoizedSelector<object, Array<Ocuppation> | null> = createSelector(
  selectUserEstablishmentState,
  getOcuppations
);

export const selectUserEstablishmentItemsPerPage: MemoizedSelector<object, number | number> = createSelector(
  selectUserEstablishmentState,
  getItemsPerPage
);

export const selectUserEstablishmentCurrentPage: MemoizedSelector<object, number | number> = createSelector(
  selectUserEstablishmentState,
  getCurrentPage
);

export const selectUserEstablishmentTotalRecords: MemoizedSelector<object, number | null> = createSelector(
  selectUserEstablishmentState,
  getTotalRecords
);

export const selectUserEstablishmentQuery: MemoizedSelector<object, IPagination> = createSelector(
  selectUserEstablishmentState,
  getQuery
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getModalDetail
);

export const selectModalHistory: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getModalHistory
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectUserEstablishmentState,
  getAlertDelete
);
