import { Action, createReducer, on } from '@ngrx/store';
import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
import * as UserEstablishmentScheduleStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(UserEstablishmentScheduleStoreActions.getUserEstablishment, (state: State) => ({
    ...state,
    isLoadingGetUserEstablishment: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentScheduleStoreActions.getUserEstablishmentSuccess, (state: State, { userEstablishment }) => ({
    ...state,
    isLoadingGetUserEstablishment: false,
    isLoadingGeneral: false,
    userEstablishment
  })),
  on(UserEstablishmentScheduleStoreActions.getUserEstablishmentSchedules, (state: State, { query }) => ({
    ...state,
    isLoadingGetUserEstablishmentSchedules: true,
    isLoadingGeneral: true,
    queryForGetSchedules: { ...query }
  })),
  on(UserEstablishmentScheduleStoreActions.getUserEstablishmentSchedulesSuccess, (state: State, { schedules }) => ({
    ...state,
    userEstablishmentSchedules: schedules,
    isLoadingGetUserEstablishmentSchedules: false,
    isLoadingGeneral: false
  })),
  on(UserEstablishmentScheduleStoreActions.createUserEstablishmentSchedule, (state: State) => ({
    ...state,
    isLoadingCreateUserEstablishmentSchedule: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentScheduleStoreActions.createUserEstablishmentScheduleSuccess, (state: State) => ({
    ...state,
    isLoadingCreateUserEstablishmentSchedule: false,
    isLoadingGeneral: false
  })),
  on(UserEstablishmentScheduleStoreActions.updateUserEstablishmentSchedule, (state: State) => ({
    ...state,
    isLoadingUpdateUserEstablishmentSchedule: true,
    isLoadingGeneral: true
  })),
  on(UserEstablishmentScheduleStoreActions.updateUserEstablishmentScheduleSuccess, (state: State, { schedule }) => {
    let buff = null;
    if (Array.isArray(state.userEstablishmentSchedules)) {
      const index = state.userEstablishmentSchedules.findIndex((s: UserEstablishmentSchedule) => s.id === schedule.id);
      buff = [...state.userEstablishmentSchedules];
      if (index !== -1) {
        buff = [...buff.slice(0, index), schedule, ...buff.slice(index + 1)];
      }
    }

    return {
      ...state,
      userEstablishmentSchedules: buff,
      isLoadingUpdateUserEstablishmentSchedule: false,
      isLoadingGeneral: false
    };
  }),
  on(UserEstablishmentScheduleStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(UserEstablishmentScheduleStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(UserEstablishmentScheduleStoreActions.modalDetailOpen, (state: State, { schedule }) => ({
    ...state,
    modalDetail: true,
    userEstablishmentScheduleForDetail: schedule
  })),
  on(UserEstablishmentScheduleStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    userEstablishmentScheduleForDetail: null
  })),
  on(UserEstablishmentScheduleStoreActions.modalEditOpen, (state: State, { schedule }) => ({
    ...state,
    modalEdit: true,
    userEstablishmentScheduleForEdit: schedule
  })),
  on(UserEstablishmentScheduleStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    userEstablishmentScheduleForEdit: null
  })),
  on(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleFailure, (state: State, { data }) => ({
    ...state,
    isLoadingGetUserEstablishment: false,
    isLoadingGetUserEstablishmentSchedules: false,
    isLoadingCreateUserEstablishmentSchedule: false,
    isLoadingUpdateUserEstablishmentSchedule: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(UserEstablishmentScheduleStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(UserEstablishmentScheduleStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(UserEstablishmentScheduleStoreActions.clearQueryForGetSchedules, (state: State) => ({
    ...state,
    queryForGetSchedules: null
  })),
  on(UserEstablishmentScheduleStoreActions.clearUserEstablishmentSchedule, (state: State) => ({
    userEstablishment: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    queryForGetSchedules: null,
    userEstablishmentSchedules: null,
    userEstablishmentScheduleForEdit: null,
    userEstablishmentScheduleForDetail: null,
    error: null,
    success: null,
    isLoadingGetUserEstablishment: false,
    isLoadingGetUserEstablishmentSchedules: false,
    isLoadingCreateUserEstablishmentSchedule: false,
    isLoadingUpdateUserEstablishmentSchedule: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function userEstablishmentScheduleReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
