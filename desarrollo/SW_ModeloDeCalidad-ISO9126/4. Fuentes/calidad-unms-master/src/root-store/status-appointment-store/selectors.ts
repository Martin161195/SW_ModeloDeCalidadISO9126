import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { StatusAppointment } from '@shared/models/status-appointment/status-appointment.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetStatusAppointments = (state: State): boolean => state.isLoadingGetStatusAppointments;

const getIsLoadingGetEstablishmentStatusAppointments = (state: State): boolean => state.isLoadingGetEstablishmentStatusAppointments;

const getIsLoadingUpdateEstablishmentStatusAppointments = (state: State): boolean => state.isLoadingUpdateEstablishmentStatusAppointments;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getStatusAppointments = (state: State): Array<StatusAppointment> | null => state.statusAppointments;

const getEstablishmentStatusAppointments = (state: State): Array<StatusAppointment> | null => state.establishmentStatusAppointments;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('status-appointment');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetStatusAppointments: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetStatusAppointments
);

export const selectIsLoadingGetEstablishmentStatusAppointments: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetEstablishmentStatusAppointments
);

export const selectIsLoadingUpdateEstablishmentStatusAppointments: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateEstablishmentStatusAppointments
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectStatusAppointments: MemoizedSelector<object, Array<StatusAppointment> | null> = createSelector(
  selectState,
  getStatusAppointments
);

export const selectEstablishmentStatusAppointments: MemoizedSelector<object, Array<StatusAppointment> | null> = createSelector(
  selectState,
  getEstablishmentStatusAppointments
);
