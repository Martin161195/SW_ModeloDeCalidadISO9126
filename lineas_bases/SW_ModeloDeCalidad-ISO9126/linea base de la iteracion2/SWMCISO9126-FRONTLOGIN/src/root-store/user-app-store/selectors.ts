import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IProductVoucher } from '@shared/models/product/product.interface';
import { UserApp } from '@shared/models/user-app/user-app.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetUsersApp = (state: State): boolean => state.isLoadingGetUsersApp;

const getIsLoadingGetUsersAppByEmail = (state: State): boolean => state.isLoadingGetUsersAppByEmail;

const getIsLoadingGetUsersAppByEmailOrNames = (state: State): boolean => state.isLoadingGetUsersAppByEmailOrNames;

const getIsLoadingGetUserAppByDocument = (state: State): boolean => state.isLoadingGetUserAppByDocument;

const getIsLoadingGetUserAppByEmail = (state: State): boolean => state.isLoadingGetUserAppByEmail;

const getIsLoadingCreateUserApp = (state: State): boolean => state.isLoadingCreateUserApp;

const getIsLoadingUpdateUserApp = (state: State): boolean => state.isLoadingUpdateUserApp;

const getIsLoadingDeleteUserApp = (state: State): boolean => state.isLoadingDeleteUserApp;

const getIsLoadingUserAppointmenHistory = (state: State): boolean => state.isLoadingGetUserAppointmentHistory;

const getIsLoadingUserProductHistory = (state: State): boolean => state.isLoadingGetUserProductHistory;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getUsersApp = (state: State): Array<UserApp> | null => state.usersApp;

const getUsersAppByEmail = (state: State): Array<UserApp> | null => state.usersAppByEmail;

const getUsersAppByEmailOrNames = (state: State): Array<UserApp> | null => state.usersAppByEmailOrNames;

const getUserAppByDocument = (state: State): UserApp | null => state.userAppByDocument;

const getUserAppByEmail = (state: State): UserApp | null => state.userAppByEmail;

const getUserAppForDelete = (state: State): UserApp | null => state.userAppForDelete;

const getUserAppForDetail = (state: State): UserApp | null => state.userAppForDetail;

const getUserAppForEdit = (state: State): UserApp | null => state.userAppForEdit;

const getUserAppForHistory = (state: State): UserApp | null => state.userAppForHistory;

const getUserAppoinmentHistory = (state: State): Array<Appointment> | null => state.userAppointmentHistory;

const getUserProductHistory = (state: State): Array<IProductVoucher> | null => state.userProductHistory;

const getItemsPerPage = (state: State): number | null => state.itemsPerPage;

const getCurrentPage = (state: State): number | null => state.currentPage;

const getTotalRecords = (state: State): number | null => state.totalRecords;

const getQuery = (state: State): IPagination => state.query;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalHistory = (state: State): boolean => state.modalHistory;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectUserAppState: MemoizedSelector<object, State> = createFeatureSelector<State>('user-app');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectUserAppState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectUserAppState,
  getSuccess
);

export const selectIsLoadingGetUsersApp: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingGetUsersApp
);

export const selectIsLoadingGetUsersAppByEmail: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingGetUsersAppByEmail
);

export const selectIsLoadingGetUsersAppByEmailOrNames: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingGetUsersAppByEmailOrNames
);

export const selectIsLoadingGetUserAppByDocument: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingGetUserAppByDocument
);

export const selectIsLoadingGetUserAppByEmail: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingGetUserAppByEmail
);

export const selectIsLoadingCreateUserApp: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingCreateUserApp
);

export const selectIsLoadingDeleteUserApp: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingDeleteUserApp
);

export const selectIsLoadingUserAppointmentHistory: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingUserAppointmenHistory
);

export const selectIsLoadingUserProductHistory: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingUserProductHistory
);

export const selectIsLoadingUpdateUserApp: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingUpdateUserApp
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getIsLoadingGeneral
);

export const selectUsersApp: MemoizedSelector<object, Array<UserApp> | null> = createSelector(
  selectUserAppState,
  getUsersApp
);

export const selectUsersAppByEmail: MemoizedSelector<object, Array<UserApp> | null> = createSelector(
  selectUserAppState,
  getUsersAppByEmail
);

export const selectUsersAppByEmailOrNames: MemoizedSelector<object, Array<UserApp> | null> = createSelector(
  selectUserAppState,
  getUsersAppByEmailOrNames
);

export const selectUserAppByDocument: MemoizedSelector<object, UserApp | null> = createSelector(
  selectUserAppState,
  getUserAppByDocument
);

export const selectUserAppByEmail: MemoizedSelector<object, UserApp | null> = createSelector(
  selectUserAppState,
  getUserAppByEmail
);

export const selectUserAppForDelete: MemoizedSelector<object, UserApp | null> = createSelector(
  selectUserAppState,
  getUserAppForDelete
);

export const selectUserAppForDetail: MemoizedSelector<object, UserApp | null> = createSelector(
  selectUserAppState,
  getUserAppForDetail
);

export const selectUserAppForEdit: MemoizedSelector<object, UserApp | null> = createSelector(
  selectUserAppState,
  getUserAppForEdit
);

export const selectUserAppForHistory: MemoizedSelector<object, UserApp | null> = createSelector(
  selectUserAppState,
  getUserAppForHistory
);

export const selectUserAppointmentHistory: MemoizedSelector<object, Array<Appointment> | null> = createSelector(
  selectUserAppState,
  getUserAppoinmentHistory
);

export const selectUserProductHistory: MemoizedSelector<object, Array<IProductVoucher> | null> = createSelector(
  selectUserAppState,
  getUserProductHistory
);

export const selectItemsPerPage: MemoizedSelector<object, number | number> = createSelector(
  selectUserAppState,
  getItemsPerPage
);

export const selectCurrentPage: MemoizedSelector<object, number | number> = createSelector(
  selectUserAppState,
  getCurrentPage
);

export const selectTotalRecords: MemoizedSelector<object, number | null> = createSelector(
  selectUserAppState,
  getTotalRecords
);

export const selectQuery: MemoizedSelector<object, IPagination> = createSelector(
  selectUserAppState,
  getQuery
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getModalDetail
);

export const selectModalHistory: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getModalHistory
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectUserAppState,
  getAlertDelete
);
