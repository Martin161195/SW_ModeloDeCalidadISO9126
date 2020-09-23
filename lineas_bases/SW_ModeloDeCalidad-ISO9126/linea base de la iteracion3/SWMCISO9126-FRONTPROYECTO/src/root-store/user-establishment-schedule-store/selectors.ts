import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
import { IQueryForGetSchedules } from '@shared/models/user-establishment-schedule/user-establishment-schedule.interface';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetUserEstablishment = (state: State): boolean => state.isLoadingGetUserEstablishment;

const getIsLoadingGetUserEstablishmentSchedules = (state: State): boolean => state.isLoadingGetUserEstablishmentSchedules;

const getIsLoadingCreateUserEstablishmentSchedule = (state: State): boolean => state.isLoadingCreateUserEstablishmentSchedule;

const getIsLoadingUpdateUserEstablishmentSchedule = (state: State): boolean => state.isLoadingUpdateUserEstablishmentSchedule;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getUserEstablishment = (state: State): UserEstablishment | null => state.userEstablishment;

const getQueryForGetSchedules = (state: State): IQueryForGetSchedules | null => state.queryForGetSchedules;

const getUserEstablishmentSchedules = (state: State): Array<UserEstablishmentSchedule> | null => state.userEstablishmentSchedules;

const getUserEstablishmentScheduleForEdit = (state: State): UserEstablishmentSchedule | null => state.userEstablishmentScheduleForEdit;

const getUserEstablishmentScheduleForDetail = (state: State): UserEstablishmentSchedule | null => state.userEstablishmentScheduleForDetail;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

// tslint:disable-next-line:max-line-length
export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('user-establishment-schedule');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetUserEstablishment: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetUserEstablishment
);

export const selectIsLoadingGetUserEstablishmentSchedules: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetUserEstablishmentSchedules
);

export const selectIsLoadingCreateUserEstablishmentSchedule: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingCreateUserEstablishmentSchedule
);

export const selectIsLoadingUpdateUserEstablishmentSchedule: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateUserEstablishmentSchedule
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectUserEstablishment: MemoizedSelector<object, UserEstablishment | null> = createSelector(
  selectState,
  getUserEstablishment
);

export const selectQueryForGetSchedules: MemoizedSelector<object, IQueryForGetSchedules | null> = createSelector(
  selectState,
  getQueryForGetSchedules
);

export const selectUserEstablishmentSchedules: MemoizedSelector<object, Array<UserEstablishmentSchedule> | null> = createSelector(
  selectState,
  getUserEstablishmentSchedules
);

export const selectUserEstablishmentScheduleForEdit: MemoizedSelector<object, UserEstablishmentSchedule | null> = createSelector(
  selectState,
  getUserEstablishmentScheduleForEdit
);

export const selectUserEstablishmentScheduleForDetail: MemoizedSelector<object, UserEstablishmentSchedule | null> = createSelector(
  selectState,
  getUserEstablishmentScheduleForDetail
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getModalDetail
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getModalEdit
);
