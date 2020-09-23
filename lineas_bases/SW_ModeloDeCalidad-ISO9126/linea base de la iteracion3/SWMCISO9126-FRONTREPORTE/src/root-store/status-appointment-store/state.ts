import { StatusAppointment } from '@shared/models/status-appointment/status-appointment.class';

// tslint:disable-next-line: interface-name
export interface State {
  // statusAppointments
  statusAppointments: Array<StatusAppointment> | null;
  // statusAppointments by Establishment
  establishmentStatusAppointments: Array<StatusAppointment> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Status_Appointment
  isLoadingGetStatusAppointments: boolean;
  // load while send request for Get Establishment Status_Appointment
  isLoadingGetEstablishmentStatusAppointments: boolean;
  // load while send request for Update Establishment Status_Appointment
  isLoadingUpdateEstablishmentStatusAppointments: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  statusAppointments: null,
  establishmentStatusAppointments: null,
  error: null,
  success: null,
  isLoadingGetStatusAppointments: false,
  isLoadingGetEstablishmentStatusAppointments: false,
  isLoadingUpdateEstablishmentStatusAppointments: false,
  isLoadingGeneral: false
};
