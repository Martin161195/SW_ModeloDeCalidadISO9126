import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Ocuppation } from '@shared/models/ocuppation/ocuppation.class';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';

// tslint:disable-next-line: interface-name
export interface State {
  // userEstablishments retrieve from server
  usersEstablishment: Array<UserEstablishment> | null;
  // userEstablishmentAll retrieve from server
  usersEstablishmentAll: Array<UserEstablishment> | null;
  // userEstablishmentByDocument is userEstablishment by search document and documentType
  userEstablishmentByDocument: UserEstablishment | null;
  // userEstablishmentByEmail is userEstablishment by email
  userEstablishmentByEmail: UserEstablishment | null;
  // number of userEstablishments for view in table
  itemsPerPage: number | null;
  // currentPage
  currentPage: number | null;
  // All userEstablishments from database
  totalRecords: number | null;
  // order
  query: IPagination | null;
  // ocuppations
  ocuppations: Array<Ocuppation> | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model detail: open -> true, close -> false
  modalDetail: boolean;
  // State model detail: open -> true, close -> false
  modalHistory: boolean;
  // State model edit: open -> true, close -> false
  modalEdit: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // State for userEstablishment edit
  userEstablishmentForEdit: UserEstablishment | null;
  // State for userEstablishment detail
  userEstablishmentForDetail: UserEstablishment | null;
  // State for userEstablishment history
  userEstablishmentForHistory: UserEstablishment | null;
  // State for userEstablishment delete
  userEstablishmentForDelete: UserEstablishment | null;
  // State for userEstablishment Appointment history
  userEstablishmentAppointmentHistory: Array<Appointment> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get UserEstablishments
  isLoadingGetUsersEstablishment: boolean;
  // load while send request for Get UsersEstablishment All
  isLoadingGetUsersEstablishmentAll: boolean;
  // load while send request for Search  UserEstablishment by documentType and document
  isLoadingGetUserEstablishmentByDocument: boolean;
  // load while send request for Search  UserEstablishment by email
  isLoadingGetUserEstablishmentByEmail: boolean;
  // load while send request for Get ocuppations
  isLoadingGetOcuppations: boolean;
  // load while send request for Appointments history
  isLoadingGetUserEstablishmentAppointmentHistory: boolean;
  // load while send request for Create UserEstablishment
  isLoadingCreateUserEstablishment: boolean;
  // load while send request for Update UserEstablishment
  isLoadingUpdateUserEstablishment: boolean;
  // load while send request for Delete UserEstablishment
  isLoadingDeleteUserEstablishment: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  usersEstablishment: null,
  usersEstablishmentAll: null,
  userEstablishmentByDocument: null,
  userEstablishmentByEmail: null,
  itemsPerPage: null,
  currentPage: null,
  totalRecords: null,
  query: null,
  ocuppations: null,
  modalCreate: false,
  modalDetail: false,
  modalHistory: false,
  modalEdit: false,
  alertDelete: false,
  userEstablishmentForEdit: null,
  userEstablishmentForDelete: null,
  userEstablishmentForDetail: null,
  userEstablishmentForHistory: null,
  userEstablishmentAppointmentHistory: null,
  error: null,
  success: null,
  isLoadingGetUsersEstablishment: false,
  isLoadingGetUsersEstablishmentAll: false,
  isLoadingGetUserEstablishmentByDocument: false,
  isLoadingGetUserEstablishmentByEmail: false,
  isLoadingGetOcuppations: false,
  isLoadingGetUserEstablishmentAppointmentHistory: false,
  isLoadingCreateUserEstablishment: false,
  isLoadingDeleteUserEstablishment: false,
  isLoadingUpdateUserEstablishment: false,
  isLoadingGeneral: false
};
