import { Injectable } from '@angular/core';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { UserAppService } from '@providers/services/user-app/user-app.service';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { IProductVoucher } from '@shared/models/product/product.interface';
import { UserApp, UserAppWithPagination } from '@shared/models/user-app/user-app.class';
import { IUserAppCreateRequestOrEdit } from '@shared/models/user-app/user-app.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as UserAppStoreActions from './actions';
import {
  selectUserAppForDelete,
  selectUserAppForEdit
} from './selectors';

@Injectable()
export class UserAppStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly serviceUserApp: UserAppService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getUsersAppEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersApp),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [query, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, establishment]: [IPagination, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getUsersApp(establishment.id, query)
          .pipe(
            map((value: UserAppWithPagination) => UserAppStoreActions.getUsersAppSuccess({ usersApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  getUsersAppSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersAppSuccess)
    ), { dispatch: false });

  getUsersAppByEmailEffect = createEffect(() => this.actions$
    .pipe(
      debounceTime(250),
      ofType(UserAppStoreActions.getUsersAppByEmail),
      map((action: { email: string }) => action.email),
      switchMap((search: string) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [search, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([search, establishment]: [string, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getUsersAppByEmail(establishment.id, search)
          .pipe(
            map((value: Array<UserApp>) => UserAppStoreActions.getUsersAppByEmailSuccess({ usersApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  getUsersAppByEmailSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersAppByEmailSuccess)
    ), { dispatch: false });

  getUsersAppByEmailClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersAppByEmailClear)
    ), { dispatch: false });

  getUsersAppByEmailOrNamesEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersAppByEmailOrNames),
      map((action: { email: string }) => action.email),
      switchMap((search: string) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [search, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([search, establishment]: [string, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getUsersAppByEmailOrNames(establishment.id, search)
          .pipe(
            map((value: Array<UserApp>) => UserAppStoreActions.getUsersAppByEmailOrNamesSuccess({ usersApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  getUsersAppByEmailOrNamesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersAppByEmailOrNamesSuccess)
    ), { dispatch: false });

  getUserAppointmentHistoryEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(UserAppStoreActions.getUserAppointmentHistory),
    map((action: { userApp: UserApp }) => action.userApp),
    switchMap((userApp: UserApp) => {
      return of([])
        .pipe(
          withLatestFrom(
            this.store$.pipe(select(selectEstablishment)),
            (initial, establishment) => {
              return [userApp, establishment];
            }
          ),
          take(1)
        );
    }),
    switchMap(([userApp, establishment]: [UserApp, LocalEstablishment]) => {
      return this.serviceUserApp.getAppointmentHistory(userApp.id, establishment.id)
        .pipe(
          map((value: Array<Appointment>) => UserAppStoreActions.getUserAppointmentHistorySuccess({ history: value })),
          catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
        );
    })
  ));

  getUserAppointmentHistorySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppointmentHistorySuccess)
    ), { dispatch: false });

  getUserProductHistoryEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(UserAppStoreActions.getUserProductHistory),
    map((action: { userApp: UserApp }) => action.userApp),
    switchMap((userApp: UserApp) => {
      return of([])
        .pipe(
          withLatestFrom(
            this.store$.pipe(select(selectEstablishment)),
            (initial, establishment) => {
              return [userApp, establishment];
            }
          ),
          take(1)
        );
    }),
    switchMap(([userApp, establishment]: [UserApp, LocalEstablishment]) => {
      return this.serviceUserApp.getProductHistory(userApp.id, establishment.id)
        .pipe(
          map((value: Array<IProductVoucher>) => UserAppStoreActions.getUserProductHistorySuccess({ history: value })),
          catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
        );
    })
  ));

  getUserProductHistorySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserProductHistorySuccess)
    ), { dispatch: false });

  getUsersAppByEmailOrNamesClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUsersAppByEmailOrNamesClear)
    ), { dispatch: false });

  getUserAppByDocumentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppByDocument),
      map((action: { query: { documentTypeId: number, document: string } }) => action.query),
      switchMap((query: { documentTypeId: number, document: string }) => {
        return this.serviceUserApp.getByDocument(query.documentTypeId, query.document)
          .pipe(
            map((value: UserApp) => UserAppStoreActions.getUserAppByDocumentSuccess({ user: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  GetUserAppByDocumentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppByDocumentSuccess)
    ), { dispatch: false });

  getUserAppByDocumentClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppByDocumentClear)
    ), { dispatch: false });

  getUserAppByEmailEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppByEmail),
      map((action: { email: string }) => action.email),
      switchMap((email: string) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [email, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([email, establishment]: [string, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getUserAppByEmail(establishment.id, email)
          .pipe(
            map((value: UserApp) => UserAppStoreActions.getUserAppByEmailSuccess({ userApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  getUserAppByEmailSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppByEmailSuccess)
    ), { dispatch: false });

  getUserAppByEmailClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.getUserAppByEmailClear)
    ), { dispatch: false });

  createUserAppEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.createUserApp),
      map((action: { newUserApp: IUserAppCreateRequestOrEdit }) => action.newUserApp),
      switchMap((query: IUserAppCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [query, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, establishment]: [IUserAppCreateRequestOrEdit, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.createUserApp(establishment.id, query)
          .pipe(
            map((value: UserApp) => UserAppStoreActions.createUserAppSuccess({ userApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  createUserAppSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.createUserAppSuccess),
      switchMap(() => of(UserAppStoreActions.userAppSuccess({ data: new VMSuccess({ message: 'SFRON_UAPP_001' }) })))
    ));

  addUserAppEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.addUserApp),
      map((action: { userAppId: number }) => action.userAppId),
      switchMap((userAppId: number) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [userAppId, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([userAppId, establishment]: [number, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.addUserApp(establishment.id, userAppId)
          .pipe(
            map((value: UserApp) => UserAppStoreActions.addUserAppSuccess({ userApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  addUserAppSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.addUserAppSuccess),
      switchMap(() => of(UserAppStoreActions.userAppSuccess({ data: new VMSuccess({ message: 'SFRON_UAPP_002' }) })))
    ));

  deleteUserAppEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.deleteUserApp),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectUserAppForDelete)),
              this.store$.pipe(select(selectEstablishment)),
              (initial, userApp, establishment) => {
                return [userApp, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([userApp, establishment]: [UserApp, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.deleteUserApp(establishment.id, userApp.id)
          .pipe(
            map((value: VMDelete) => UserAppStoreActions.deleteUserAppSuccess({ data: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  deleteUserAppSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.deleteUserAppSuccess),
      switchMap(() => of(UserAppStoreActions.userAppSuccess({ data: new VMSuccess({ message: 'SFRON_UAPP_004' }) })))
    ));

  updateUserAppEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.updateUserApp),
      map((action: { newUserApp: IUserAppCreateRequestOrEdit }) => action.newUserApp),
      switchMap((query: IUserAppCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              this.store$.pipe(select(selectUserAppForEdit)),
              (initial, establishment, userApp) => {
                return [query, establishment, userApp];
              }
            ),
            take(1)
          );
      }),
      // tslint:disable-next-line: max-line-length
      switchMap(([query, establishment, userApp]: [IUserAppCreateRequestOrEdit, LocalEstablishment, UserApp]) => {
        return this.serviceLocalEstablishment.updateUserApp(establishment.id, userApp.id, query)
          .pipe(
            map((value: UserApp) => UserAppStoreActions.updateUserAppSuccess({ userApp: value })),
            catchError((error: VMError) => of(UserAppStoreActions.userAppFailure({ data: error })))
          );
      })
    ));

  updateUserAppSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.updateUserAppSuccess),
      switchMap(() => of(UserAppStoreActions.userAppSuccess({ data: new VMSuccess({ message: 'SFRON_UAPP_003' }) })))
    ));

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalHistoryOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalHistoryOpen)
    ), { dispatch: false });

  modalHistoryCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalHistoryClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.modalEditClose)
    ), { dispatch: false });

  userAppFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.userAppFailure),
      switchMap(() => of(UserAppStoreActions.errorToNull()))
    ));

  userAppSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.userAppSuccess),
      switchMap(() => of(UserAppStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.successToNull)
    ), { dispatch: false });

  clearUserAppEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserAppStoreActions.clearUserApp)
    ), { dispatch: false });

}
