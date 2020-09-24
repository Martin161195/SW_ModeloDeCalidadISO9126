import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { RoleService } from '@providers/services/role/role.service';
import { Role } from '@shared/models/role/role.class';
import { IRoleCreateRequestOrEdit } from '@shared/models/role/role.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as RoleStoreActions from './actions';
import {
  selectRoleForDelete,
  selectRoleForEdit
} from './selectors';

@Injectable()
export class RoleStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceRole: RoleService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getRolesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.getRoles),
      switchMap(() => {
        return this.serviceRole.get()
          .pipe(
            map((value: Array<Role>) => RoleStoreActions.getRolesSuccess({ roles: value })),
            catchError((error: VMError) => of(RoleStoreActions.roleFailure({ data: error })))
          );
      })
    ));

  getRolesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.getRolesSuccess)
    ), { dispatch: false });

  createRoleEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.createRole),
      map((action: { newRole: IRoleCreateRequestOrEdit }) => action.newRole),
      switchMap((query: IRoleCreateRequestOrEdit) => {
        return this.serviceRole.create(query)
          .pipe(
            map((value: Role) => RoleStoreActions.createRoleSuccess({ role: value })),
            catchError((error: VMError) => of(RoleStoreActions.roleFailure({ data: error })))
          );
      })
    ));

  createRoleSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.createRoleSuccess),
      switchMap(() => of(RoleStoreActions.roleSuccess({ data: new VMSuccess({ message: 'SFRON_LOROLE_001' }) })))
    ));

  deleteRoleEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.deleteRole),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectRoleForDelete)),
              (initial, role) => {
                return [role];
              }
            ),
            take(1)
          );
      }),
      switchMap(([role]: [Role]) => {
        return this.serviceRole.delete(role.id)
          .pipe(
            map((value: VMDelete) => RoleStoreActions.deleteRoleSuccess({ data: value })),
            catchError((error: VMError) => of(RoleStoreActions.roleFailure({ data: error })))
          );
      })
    ));

  deleteRoleSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.deleteRoleSuccess),
      switchMap(() => of(RoleStoreActions.roleSuccess({ data: new VMSuccess({ message: 'SFRON_LOROLE_003' }) })))
    ));

  updateRoleEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.updateRole),
      map((action: { newRole: IRoleCreateRequestOrEdit }) => action.newRole),
      switchMap((newRole: IRoleCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectRoleForEdit)),
              (initial, role) => {
                return [newRole, role];
              }
            ),
            take(1)
          );
      }),
      switchMap(([newRole, role]: [IRoleCreateRequestOrEdit, Role]) => {
        return this.serviceRole.update(role.id, newRole)
          .pipe(
            map((value: Role) => RoleStoreActions.updateRoleSuccess({ role: value })),
            catchError((error: VMError) => of(RoleStoreActions.roleFailure({ data: error })))
          );
      })
    ));

  updateRoleSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.updateRoleSuccess),
      switchMap(() => of(RoleStoreActions.roleSuccess({ data: new VMSuccess({ message: 'SFRON_LOROLE_002' }) })))
    ));

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.modalEditClose)
    ), { dispatch: false });

  alertDeleteOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.alertDeleteOpen)
    ), { dispatch: false });

  alertDeleteCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.alertDeleteClose)
    ), { dispatch: false });

  serviceFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.roleFailure),
      switchMap(() => of(RoleStoreActions.errorToNull()))
    ));

  serviceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.roleSuccess),
      switchMap(() => of(RoleStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.successToNull)
    ), { dispatch: false });

  clearRoleEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleStoreActions.clearRole)
    ), { dispatch: false });

}
