import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IQueryForGetAppointments } from '@shared/models/appointment/appointment.interface';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetAppointments = (state: State): boolean => state.isLoadingGetAppointments;

const getIsLoadingGetAppointmentsByUserAppNotVoucher = (state: State): boolean => state.isLoadingGetAppointmentsByUserAppNotVoucher;

const getIsLoadingCreateAppointment = (state: State): boolean => state.isLoadingCreateAppointment;

const getIsLoadingCreateManyAppointment = (state: State): boolean => state.isLoadingCreateManyAppointment;

const getIsLoadingDeleteAppointment = (state: State): boolean => state.isLoadingDeleteAppointment;

const getIsLoadingUpdateAppointment = (state: State): boolean => state.isLoadingUpdateAppointment;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getQueryForGetAppointments = (state: State): IQueryForGetAppointments | null => state.queryForGetAppointments;

const getAppointments = (state: State): Array<Appointment> | null => state.appointments;

const getAppointmentsByUserAppNotVoucher = (state: State): Array<Appointment> | null => state.appointmentsByUserAppNotVoucher;

const getAppointmentForEdit = (state: State): Appointment | null => state.appointmentForEdit;

const getAppointmentForDetail = (state: State): Appointment | null => state.appointmentForDetail;

const getAppointmentForDelete = (state: State): Appointment | null => state.appointmentForDelete;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

// tslint:disable-next-line:max-line-length
export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('appointment');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetAppointments: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetAppointments
);

export const selectIsLoadingGetAppointmentsByUserAppNotVoucher: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetAppointmentsByUserAppNotVoucher
);

export const selectIsLoadingCreateAppointment: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingCreateAppointment
);

export const selectIsLoadingCreateManyAppointment: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingCreateManyAppointment
);

export const selectIsLoadingDeleteAppointment: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingDeleteAppointment
);

export const selectIsLoadingUpdateAppointment: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateAppointment
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectQueryForGetAppointments: MemoizedSelector<object, IQueryForGetAppointments | null> = createSelector(
  selectState,
  getQueryForGetAppointments
);

export const selectAppointments: MemoizedSelector<object, Array<Appointment> | null> = createSelector(
  selectState,
  getAppointments
);

export const selectAppointmentsByUserAppNotVoucher: MemoizedSelector<object, Array<Appointment> | null> = createSelector(
  selectState,
  getAppointmentsByUserAppNotVoucher
);

export const selectAppointmentForEdit: MemoizedSelector<object, Appointment | null> = createSelector(
  selectState,
  getAppointmentForEdit
);

export const selectAppointmentForDelete: MemoizedSelector<object, Appointment | null> = createSelector(
  selectState,
  getAppointmentForDelete
);

export const selectAppointmentForDetail: MemoizedSelector<object, Appointment | null> = createSelector(
  selectState,
  getAppointmentForDetail
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

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getAlertDelete
);
