import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { UserLocalService } from '@providers/services/user-local/user-local.service';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import { IUserLocalCreateRequestOrEdit } from '@shared/models/user-local/user-local.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as UserLocalStoreActions from './actions';
import {
  selectUserLocalForDelete,
  selectUserLocalForEdit
} from './selectors';

@Injectable()
export class UserLocalStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceUserLocal: UserLocalService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getUsersLocalEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.getUserLocals),
      switchMap(() => {
        return this.serviceUserLocal.getByLocal()
          .pipe(
            map((value: Array<UserLocal>) => UserLocalStoreActions.getUserLocalsSuccess({ users: value })),
            catchError((error: VMError) => of(UserLocalStoreActions.userLocalFailure({ data: error })))
          );
      })
    ));

  getUsersLocalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.getUserLocalsSuccess)
    ), { dispatch: false });

  createUserLocalEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.createUserLocal),
      map((action: { newUser: IUserLocalCreateRequestOrEdit }) => action.newUser),
      switchMap((query: IUserLocalCreateRequestOrEdit) => {
        return this.serviceUserLocal.createByLocal(query)
          .pipe(
            map((value: UserLocal) => UserLocalStoreActions.createUserLocalSuccess({ user: value })),
            catchError((error: VMError) => of(UserLocalStoreActions.userLocalFailure({ data: error })))
          );
      })
    ));

  createUserLocalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.createUserLocalSuccess),
      switchMap(() => of(UserLocalStoreActions.userLocalSuccess({ data: new VMSuccess({ message: 'SFRON_LOUSRLO_001' }) })))
    ));

  deleteUserLocalEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.deleteUserLocal),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectUserLocalForDelete)),
              (initial, userLocal) => {
                return [userLocal];
              }
            ),
            take(1)
          );
      }),
      switchMap(([userLocal]: [UserLocal]) => {
        return this.serviceUserLocal.delete(userLocal.id)
          .pipe(
            map((value: VMDelete) => UserLocalStoreActions.deleteUserLocalSuccess({ data: value })),
            catchError((error: VMError) => of(UserLocalStoreActions.userLocalFailure({ data: error })))
          );
      })
    ));

  deleteUserLocalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.deleteUserLocalSuccess),
      switchMap(() => of(UserLocalStoreActions.userLocalSuccess({ data: new VMSuccess({ message: 'SFRON_LOUSRLO_003' }) })))
    ));

  updateUserLocalEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.updateUserLocal),
      map((action: { newUser: IUserLocalCreateRequestOrEdit }) => action.newUser),
      switchMap((query: IUserLocalCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectUserLocalForEdit)),
              (initial, userLocal) => {
                return [query, userLocal];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, userLocal]: [IUserLocalCreateRequestOrEdit, UserLocal]) => {
        return this.serviceUserLocal.update(userLocal.id, query)
          .pipe(
            map((value: UserLocal) => UserLocalStoreActions.updateUserLocalSuccess({ user: value })),
            catchError((error: VMError) => of(UserLocalStoreActions.userLocalFailure({ data: error })))
          );
      })
    ));

  updateUserLocalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.updateUserLocalSuccess),
      switchMap(() => of(UserLocalStoreActions.userLocalSuccess({ data: new VMSuccess({ message: 'SFRON_LOUSRLO_002' }) })))
    ));

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.modalEditClose)
    ), { dispatch: false });

  serviceFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.userLocalFailure),
      switchMap(() => of(UserLocalStoreActions.errorToNull()))
    ));

  serviceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.userLocalSuccess),
      switchMap(() => of(UserLocalStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.successToNull)
    ), { dispatch: false });

  clearUserLocalEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserLocalStoreActions.clearUserLocal)
    ), { dispatch: false });

}
