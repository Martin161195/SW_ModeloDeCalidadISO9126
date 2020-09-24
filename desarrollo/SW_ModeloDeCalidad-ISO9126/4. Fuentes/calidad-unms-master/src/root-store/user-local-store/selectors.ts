import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetUsersLocal = (state: State): boolean => state.isLoadingGetUsersLocal;

const getIsLoadingCreateUserLocal = (state: State): boolean => state.isLoadingCreateUserLocal;

const getIsLoadingUpdateUserLocal = (state: State): boolean => state.isLoadingUpdateUserLocal;

const getIsLoadingDeleteUserLocal = (state: State): boolean => state.isLoadingDeleteUserLocal;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getUsersLocal = (state: State): Array<UserLocal> | null => state.usersLocal;

const getUserLocalForDelete = (state: State): UserLocal | null => state.userLocalForDelete;

const getUserLocalForDetail = (state: State): UserLocal | null => state.userLocalForDetail;

const getUserLocalForEdit = (state: State): UserLocal | null => state.userLocalForEdit;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectUserLocalState: MemoizedSelector<object, State> = createFeatureSelector<State>('user-local');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectUserLocalState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectUserLocalState,
  getSuccess
);

export const selectIsLoadingGetUsersLocal: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getIsLoadingGetUsersLocal
);

export const selectIsLoadingCreateUserLocal: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getIsLoadingCreateUserLocal
);

export const selectIsLoadingUpdateUserLocal: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getIsLoadingUpdateUserLocal
);

export const selectIsLoadingDeleteUserLocal: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getIsLoadingDeleteUserLocal
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getIsLoadingGeneral
);

export const selectUsersLocal: MemoizedSelector<object, Array<UserLocal> | null> = createSelector(
  selectUserLocalState,
  getUsersLocal
);

export const selectUserLocalForDelete: MemoizedSelector<object, UserLocal | null> = createSelector(
  selectUserLocalState,
  getUserLocalForDelete
);

export const selectUserLocalForDetail: MemoizedSelector<object, UserLocal | null> = createSelector(
  selectUserLocalState,
  getUserLocalForDetail
);

export const selectUserLocalForEdit: MemoizedSelector<object, UserLocal | null> = createSelector(
  selectUserLocalState,
  getUserLocalForEdit
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getModalDetail
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectUserLocalState,
  getAlertDelete
);
