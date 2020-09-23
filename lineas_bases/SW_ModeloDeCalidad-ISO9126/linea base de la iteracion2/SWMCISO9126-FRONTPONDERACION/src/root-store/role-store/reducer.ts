import { Action, createReducer, on } from '@ngrx/store';
import { Role } from '@shared/models/role/role.class';
import * as RoleStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(RoleStoreActions.getRoles, (state: State) => ({
    ...state,
    isLoadingGetRoles: true,
    isLoadingGeneral: true
  })),
  on(RoleStoreActions.getRolesSuccess, (state: State, { roles }) => ({
    ...state,
    isLoadingGetRoles: false,
    isLoadingGeneral: false,
    roles
  })),
  on(RoleStoreActions.createRole, (state: State) => ({
    ...state,
    isLoadingCreateRole: true,
    isLoadingGeneral: true
  })),
  on(RoleStoreActions.createRoleSuccess, (state: State) => ({
    ...state,
    isLoadingCreateRole: false,
    isLoadingGeneral: false
  })),
  on(RoleStoreActions.deleteRole, (state: State) => ({
    ...state,
    isLoadingDeleteRole: true,
    isLoadingGeneral: true
  })),
  on(RoleStoreActions.deleteRoleSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteRole: false,
    isLoadingGeneral: false
  })),
  on(RoleStoreActions.updateRole, (state: State) => ({
    ...state,
    isLoadingUpdateRole: true,
    isLoadingGeneral: true
  })),
  on(RoleStoreActions.updateRoleSuccess, (state: State, { role }) => {
    let buff = null;
    if (Array.isArray(state.roles)) {
      const index = state.roles.findIndex((s: Role) => s.id === role.id);
      buff = [...state.roles];
      if (index !== -1) {
        buff = [...buff.slice(0, index), role, ...buff.slice(index + 1)];
      }
    }

    return {
      ...state,
      roles: buff,
      isLoadingUpdateRole: false,
      isLoadingGeneral: false
    };
  }),
  on(RoleStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(RoleStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(RoleStoreActions.modalDetailOpen, (state: State, { role }) => ({
    ...state,
    modalDetail: true,
    roleForDetail: role
  })),
  on(RoleStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    roleForDetail: null
  })),
  on(RoleStoreActions.modalEditOpen, (state: State, { role }) => ({
    ...state,
    modalEdit: true,
    roleForEdit: role
  })),
  on(RoleStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    roleForEdit: null
  })),
  on(RoleStoreActions.alertDeleteOpen, (state: State, { role }) => ({
    ...state,
    alertDelete: true,
    roleForDelete: role
  })),
  on(RoleStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    roleForDelete: null
  })),
  on(RoleStoreActions.roleFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(RoleStoreActions.roleSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(RoleStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(RoleStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(RoleStoreActions.clearRole, (state: State) => ({
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
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function roleReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
