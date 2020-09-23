import { UserLocal } from '@shared/models/user-local/user-local.class';

// tslint:disable-next-line: interface-name
export interface State {
  // usersLocal retrieve from server
  usersLocal: Array<UserLocal> | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // State alert create: open -> true, close -> false
  alertDelete: boolean;
  // State for userLocal edit
  userLocalForEdit: UserLocal | null;
  // State for userLocal delete
  userLocalForDelete: UserLocal | null;
  // State for userLocal detail
  userLocalForDetail: UserLocal | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get UserLocals
  isLoadingGetUsersLocal: boolean;
  // load while send request for Create UserLocal
  isLoadingCreateUserLocal: boolean;
  // load while send request for Delete UserLocal
  isLoadingDeleteUserLocal: boolean;
  // load while send request for Update UserLocal
  isLoadingUpdateUserLocal: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  usersLocal: null,
  modalCreate: false,
  modalDetail: false,
  modalEdit: false,
  alertDelete: false,
  userLocalForEdit: null,
  userLocalForDelete: null,
  userLocalForDetail: null,
  error: null,
  success: null,
  isLoadingGetUsersLocal: false,
  isLoadingCreateUserLocal: false,
  isLoadingUpdateUserLocal: false,
  isLoadingDeleteUserLocal: false,
  isLoadingGeneral: false
};
