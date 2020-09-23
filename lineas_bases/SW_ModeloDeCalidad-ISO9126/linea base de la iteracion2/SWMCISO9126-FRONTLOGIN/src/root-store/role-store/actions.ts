import { createAction, props } from '@ngrx/store';
import { Role } from '@shared/models/role/role.class';
import { IRoleCreateRequestOrEdit } from '@shared/models/role/role.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETROLES = '[ROLE] Get Roles',
  GETROLESSUCCESS = '[ROLE] Get Roles Success',
  CREATEROLE = '[ROLE] Create Role',
  CREATEROLESUCCESS = '[ROLE] Create Role Success',
  UPDATEROLE = '[ROLE] Update Role',
  UPDATEROLESUCCESS = '[ROLE] Update Role Success',
  DELETEROLE = '[ROLE] Delete Role',
  DELETEROLESUCCESS = '[ROLE] Delete Role Success',
  // Events for modal
  MODALCREATEOPEN = '[ROLE] Modal Create Open',
  MODALCREATECLOSE = '[ROLE] Modal Create Close',
  MODALDETAILOPEN = '[ROLE] Modal Detail Open',
  MODALDETAILCLOSE = '[ROLE] Modal Detail Close',
  MODALEDITOPEN = '[ROLE] Modal Edit Open',
  MODALEDITCLOSE = '[ROLE] Modal Edit Close',
  ALERTDELETEOPEN = '[ROLE] Alert Delete Open',
  ALERTDELETECLOSE = '[ROLE] Alert Delete Close',
  // Error global role
  ROLESUCCESS = '[ROLE] Role Success',
  ROLEFAILURE = '[ROLE] Role Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[ROLE] Error To Null',
  SUCCESSTONULL = '[ROLE] Success To Null',
  // Clear state
  CLEARROLE = '[ROLE] Clear Role'
}

export const getRoles = createAction(
  ActionTypes.GETROLES
);

export const getRolesSuccess = createAction(
  ActionTypes.GETROLESSUCCESS,
  props<{ roles: Array<Role> }>()
);

export const createRole = createAction(
  ActionTypes.CREATEROLE,
  props<{ newRole: IRoleCreateRequestOrEdit }>()
);

export const createRoleSuccess = createAction(
  ActionTypes.CREATEROLESUCCESS,
  props<{ role: Role }>()
);

export const deleteRole = createAction(
  ActionTypes.DELETEROLE
);

export const deleteRoleSuccess = createAction(
  ActionTypes.DELETEROLESUCCESS,
  props<{ data: VMDelete }>()
);

export const updateRole = createAction(
  ActionTypes.UPDATEROLE,
  props<{ newRole: IRoleCreateRequestOrEdit }>()
);

export const updateRoleSuccess = createAction(
  ActionTypes.UPDATEROLESUCCESS,
  props<{ role: Role }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ role: Role }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ role: Role }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ role: Role }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const roleSuccess = createAction(
  ActionTypes.ROLESUCCESS,
  props<{ data: VMSuccess }>()
);

export const roleFailure = createAction(
  ActionTypes.ROLEFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearRole = createAction(
  ActionTypes.CLEARROLE
);
