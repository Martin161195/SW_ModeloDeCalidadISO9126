import { Role } from '@shared/models/role/role.class';

// tslint:disable-next-line: interface-name
export interface State {
  // roles retrieve from server
  roles: Array<Role> | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // State for role edit
  roleForEdit: Role | null;
  // State for role detail
  roleForDetail: Role | null;
  // State for role delete
  roleForDelete: Role | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Roles
  isLoadingGetRoles: boolean;
  // load while send request for Create Role
  isLoadingCreateRole: boolean;
  // load while send request for Update Role
  isLoadingUpdateRole: boolean;
  // load while send request for Delete Role
  isLoadingDeleteRole: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  roles: null,
  modalCreate: false,
  modalDetail: false,
  modalEdit: false,
  alertDelete: false,
  roleForEdit: null,
  roleForDetail: null,
  roleForDelete: null,
  error: null,
  success: null,
  isLoadingGetRoles: false,
  isLoadingCreateRole: false,
  isLoadingDeleteRole: false,
  isLoadingUpdateRole: false,
  isLoadingGeneral: false
};
