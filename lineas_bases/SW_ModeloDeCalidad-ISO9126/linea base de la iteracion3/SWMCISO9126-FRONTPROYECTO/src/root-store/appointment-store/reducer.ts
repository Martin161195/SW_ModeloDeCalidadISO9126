import { Action, createReducer, on } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import * as AppointmentStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(AppointmentStoreActions.getAppointments, (state: State, { query }) => ({
    ...state,
    isLoadingGetAppointments: true,
    isLoadingGeneral: true,
    queryForGetAppointments: { ...query }
  })),
  on(AppointmentStoreActions.getAppointmentsSuccess, (state: State, { appointments }) => ({
    ...state,
    appointments,
    isLoadingGetAppointments: false,
    isLoadingGeneral: false
  })),
  on(AppointmentStoreActions.getAppointmentsByUserAppNotVoucher, (state: State) => ({
    ...state,
    isLoadingGetAppointmentsByUserAppNotVoucher: true,
    isLoadingGeneral: true
  })),
  on(AppointmentStoreActions.getAppointmentsByUserAppNotVoucherSuccess, (state: State, { appointments }) => ({
    ...state,
    appointmentsByUserAppNotVoucher: appointments,
    appointmentsByUserAppNotVoucherBuffer: appointments,
    isLoadingGetAppointmentsByUserAppNotVoucher: false,
    isLoadingGeneral: false
  })),
  on(AppointmentStoreActions.clearGetAppointmentsByUserAppNotVoucher, (state: State) => ({
    ...state,
    appointmentsByUserAppNotVoucher: null,
    appointmentsByUserAppNotVoucherBuffer: null,
    isLoadingGetAppointmentsByUserAppNotVoucher: false,
    isLoadingGeneral: false
  })),
  on(AppointmentStoreActions.addAppointmentByUserToVoucher, (state: State, { appointmentId }) => {
    if (!!state.appointmentsByUserAppNotVoucher) {
      const index = state.appointmentsByUserAppNotVoucher.findIndex((ap: Appointment) => !!ap && (ap.id === appointmentId));
      let buff = [...state.appointmentsByUserAppNotVoucher];
      if (index !== -1) {
        buff = [
          ...buff.slice(0, index),
          null,
          ...buff.slice(index + 1)
        ];
      }

      return {
        ...state,
        appointmentsByUserAppNotVoucher: [...buff]
      };
    }

    return {
      ...state
    };
  }),
  on(AppointmentStoreActions.removeAppointmentByUserToVoucher, (state: State, { appointmentId }) => {
    if (!!state.appointmentsByUserAppNotVoucher && state.appointmentsByUserAppNotVoucherBuffer) {
      const index = state.appointmentsByUserAppNotVoucherBuffer.findIndex((ap: Appointment) => !!ap && (ap.id === appointmentId));
      let buff = [...state.appointmentsByUserAppNotVoucher];
      if (index !== -1) {
        buff = [
          ...buff.slice(0, index),
          state.appointmentsByUserAppNotVoucherBuffer[index],
          ...buff.slice(index + 1)
        ];
      }

      return {
        ...state,
        appointmentsByUserAppNotVoucher: [...buff]
      };
    }

    return {
      ...state
    };
  }),
  on(AppointmentStoreActions.createManyAppointment, (state: State) => ({
    ...state,
    isLoadingCreateManyAppointment: true,
    isLoadingGeneral: true
  })),
  on(AppointmentStoreActions.createManyAppointmentSuccess, (state: State) => ({
    ...state,
    isLoadingCreateManyAppointment: false,
    isLoadingGeneral: false
  })),
  on(AppointmentStoreActions.deleteAppointment, (state: State) => ({
    ...state,
    isLoadingDeleteAppointment: true,
    isLoadingGeneral: true
  })),
  on(AppointmentStoreActions.deleteAppointmentSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteAppointment: false,
    isLoadingGeneral: false
  })),
  on(AppointmentStoreActions.updateAppointment, (state: State) => ({
    ...state,
    isLoadingUpdateAppointment: true,
    isLoadingGeneral: true
  })),
  on(AppointmentStoreActions.updateAppointmentSuccess, (state: State, { appointment }) => {
    if (!!state.appointments) {
      const index = state.appointments.findIndex((s: Appointment) => s.id === appointment.id);
      let buff = [...state.appointments];
      if (index !== -1) {
        buff = [
          ...buff.slice(0, index),
          appointment,
          ...buff.slice(index + 1)
        ];
      }

      return {
        ...state,
        appointments: [...buff],
        isLoadingUpdateAppointment: false,
        isLoadingGeneral: false
      };
    }

    return {
      ...state,
      isLoadingUpdateAppointment: false,
      isLoadingGeneral: false
    };
  }),
  on(AppointmentStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(AppointmentStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(AppointmentStoreActions.modalDetailOpen, (state: State, { appointment }) => ({
    ...state,
    modalDetail: true,
    appointmentForDetail: appointment
  })),
  on(AppointmentStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    appointmentForDetail: null
  })),
  on(AppointmentStoreActions.modalEditOpen, (state: State, { appointment }) => ({
    ...state,
    modalEdit: true,
    appointmentForEdit: appointment
  })),
  on(AppointmentStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    appointmentForEdit: null
  })),
  on(AppointmentStoreActions.alertDeleteOpen, (state: State, { appointment }) => ({
    ...state,
    alertDelete: true,
    appointmentForDelete: appointment
  })),
  on(AppointmentStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    appointmentForDelete: null
  })),
  on(AppointmentStoreActions.appointmentFailure, (state: State, { data }) => ({
    ...state,
    isLoadingGetAppointments: false,
    isLoadingCreateAppointment: false,
    isLoadingCreateManyAppointment: false,
    isLoadingUpdateAppointment: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(AppointmentStoreActions.appointmentSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(AppointmentStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(AppointmentStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(AppointmentStoreActions.clearQueryForGetAppointments, (state: State) => ({
    ...state,
    queryForGetAppointments: null
  })),
  on(AppointmentStoreActions.clearAppointment, (state: State) => ({
    appointments: null,
    appointmentsByUserAppNotVoucher: null,
    appointmentsByUserAppNotVoucherBuffer: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    alertDelete: false,
    queryForGetAppointments: null,
    appointmentForEdit: null,
    appointmentForDetail: null,
    appointmentForDelete: null,
    error: null,
    success: null,
    isLoadingGetAppointments: false,
    isLoadingGetAppointmentsByUserAppNotVoucher: false,
    isLoadingCreateAppointment: false,
    isLoadingCreateManyAppointment: false,
    isLoadingDeleteAppointment: false,
    isLoadingUpdateAppointment: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function appointmentReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
