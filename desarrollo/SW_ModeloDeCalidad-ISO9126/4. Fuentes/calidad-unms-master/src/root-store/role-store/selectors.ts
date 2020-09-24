import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Role } from '@shared/models/role/role.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetRoles = (state: State): boolean => state.isLoadingGetRoles;

const getIsLoadingCreateRole = (state: State): boolean => state.isLoadingCreateRole;

const getIsLoadingDeleteRole = (state: State): boolean => state.isLoadingDeleteRole;

const getIsLoadingUpdateRole = (state: State): boolean => state.isLoadingUpdateRole;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getRoles = (state: State): Array<Role> | null => state.roles;

const getRoleForDetail = (state: State): Role | null => state.roleForDetail;

const getRoleForDelete = (state: State): Role | null => state.roleForDelete;

const getRoleForEdit = (state: State): Role | null => state.roleForEdit;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectRoleState: MemoizedSelector<object, State> = createFeatureSelector<State>('role');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectRoleState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectRoleState,
  getSuccess
);

export const selectIsLoadingGetRoles: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getIsLoadingGetRoles
);

export const selectIsLoadingCreateRole: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getIsLoadingCreateRole
);

export const selectIsLoadingDeleteRole: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getIsLoadingDeleteRole
);

export const selectIsLoadingUpdateRole: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getIsLoadingUpdateRole
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getIsLoadingGeneral
);

export const selectRoles: MemoizedSelector<object, Array<Role> | null> = createSelector(
  selectRoleState,
  getRoles
);

export const selectRoleForDetail: MemoizedSelector<object, Role | null> = createSelector(
  selectRoleState,
  getRoleForDetail
);

export const selectRoleForDelete: MemoizedSelector<object, Role | null> = createSelector(
  selectRoleState,
  getRoleForDelete
);

export const selectRoleForEdit: MemoizedSelector<object, Role | null> = createSelector(
  selectRoleState,
  getRoleForEdit
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getModalDetail
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectRoleState,
  getAlertDelete
);
