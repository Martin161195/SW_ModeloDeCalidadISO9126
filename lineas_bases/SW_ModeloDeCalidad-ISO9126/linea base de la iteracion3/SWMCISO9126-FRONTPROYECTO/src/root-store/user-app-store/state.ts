import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IProductVoucher } from '@shared/models/product/product.interface';
import { UserApp } from '@shared/models/user-app/user-app.class';

// tslint:disable-next-line: interface-name
export interface State {
  // users retrieve from server
  usersApp: Array<UserApp> | null;
  // users retrieve by email from server
  usersAppByEmail: Array<UserApp> | null;
  // users retrieve by names or email from server
  usersAppByEmailOrNames: Array<UserApp> | null;
  // userAppByDocument is userApp by search document and documentType
  userAppByDocument: UserApp | null;
  // userAppByEmail is userApp by search email
  userAppByEmail: UserApp | null;
  // number of users for view in table
  itemsPerPage: number | null;
  // currentPage
  currentPage: number | null;
  // currentPage
  totalRecords: number | null;
  // order
  query: IPagination | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalHistory: boolean;
  // State model edit: open -> true, close -> false
  modalEdit: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // State for userApp edit
  userAppForEdit: UserApp | null;
  // State for userApp delete
  userAppForDelete: UserApp | null;
  // State for userApp detail
  userAppForDetail: UserApp | null;
  // State for userApp history
  userAppForHistory: UserApp | null;
  // State for user's history appointments
  userAppointmentHistory: Array<Appointment> | null;
  // State for user's prodcut appointments
  userProductHistory: Array<IProductVoucher> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Users App
  isLoadingGetUsersApp: boolean;
  // load while send request for Get Users App by Email
  isLoadingGetUsersAppByEmail: boolean;
  // load while send request for Get Users App by Email
  isLoadingGetUsersAppByEmailOrNames: boolean;
  // load while send request for Search  User App by documentType and document
  isLoadingGetUserAppByDocument: boolean;
  // load while send request for Search  User App by email
  isLoadingGetUserAppByEmail: boolean;
  // load while send request for Create UserApp
  isLoadingCreateUserApp: boolean;
  // load while send request for Update UserApp
  isLoadingUpdateUserApp: boolean;
  // load while send request for Delete UserApp
  isLoadingDeleteUserApp: boolean;
  // load while send request for Get Users App
  isLoadingGetUserAppointmentHistory: boolean;
  // load while send request for Get Users App
  isLoadingGetUserProductHistory: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  usersApp: null,
  usersAppByEmail: null,
  usersAppByEmailOrNames: null,
  userAppByDocument: null,
  userAppByEmail: null,
  itemsPerPage: null,
  currentPage: null,
  totalRecords: null,
  query: null,
  modalCreate: false,
  modalDetail: false,
  modalEdit: false,
  modalHistory: false,
  alertDelete: false,
  userAppForDelete: null,
  userAppForDetail: null,
  userAppForEdit: null,
  userAppForHistory: null,
  userAppointmentHistory: null,
  userProductHistory: null,
  error: null,
  success: null,
  isLoadingGetUsersApp: false,
  isLoadingGetUsersAppByEmail: false,
  isLoadingGetUsersAppByEmailOrNames: false,
  isLoadingGetUserAppByDocument: false,
  isLoadingGetUserAppByEmail: false,
  isLoadingCreateUserApp: false,
  isLoadingUpdateUserApp: false,
  isLoadingDeleteUserApp: false,
  isLoadingGetUserAppointmentHistory: false,
  isLoadingGetUserProductHistory: false,
  isLoadingGeneral: false
};
