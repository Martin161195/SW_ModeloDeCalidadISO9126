import { Action, createReducer, on } from '@ngrx/store';
import * as StatusAppointmentStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(StatusAppointmentStoreActions.getStatusAppointments, (state: State) => ({
    ...state,
    isLoadingGetStatusAppointments: true,
    isLoadingGeneral: true
  })),
  on(StatusAppointmentStoreActions.getStatusAppointmentsSuccess, (state: State, { appointmentStatus }) => ({
    ...state,
    isLoadingGetStatusAppointments: false,
    isLoadingGeneral: false,
    statusAppointments: appointmentStatus
  })),
  on(StatusAppointmentStoreActions.getEstablishmentStatusAppointments, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentStatusAppointments: true,
    isLoadingGeneral: true
  })),
  on(StatusAppointmentStoreActions.getEstablishmentStatusAppointmentsSuccess, (state: State, { appointmentStatus }) => ({
    ...state,
    isLoadingGetEstablishmentStatusAppointments: false,
    isLoadingGeneral: false,
    establishmentStatusAppointments: appointmentStatus
  })),
  on(StatusAppointmentStoreActions.updateEstablishmentStatusAppointments, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentStatusAppointments: true,
    isLoadingGeneral: true
  })),
  on(StatusAppointmentStoreActions.updateEstablishmentStatusAppointmentsSuccess, (state: State, { appointmentStatus }) => ({
    ...state,
    isLoadingUpdateEstablishmentStatusAppointments: false,
    isLoadingGeneral: false,
    establishmentStatusAppointments: appointmentStatus
  })),
  on(StatusAppointmentStoreActions.statusAppointmentFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(StatusAppointmentStoreActions.statusAppointmentSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(StatusAppointmentStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(StatusAppointmentStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(StatusAppointmentStoreActions.clearStatusAppointment, (state: State) => ({
    statusAppointments: null,
    establishmentStatusAppointments: null,
    error: null,
    success: null,
    isLoadingGetStatusAppointments: false,
    isLoadingGetEstablishmentStatusAppointments: false,
    isLoadingUpdateEstablishmentStatusAppointments: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function statusAppointmentReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
