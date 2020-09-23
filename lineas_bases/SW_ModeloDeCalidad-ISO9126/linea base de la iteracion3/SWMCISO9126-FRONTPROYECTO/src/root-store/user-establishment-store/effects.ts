import { Injectable } from '@angular/core';
import { _chunck, _sort } from '@core/common/helpers-array';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { OcuppationService } from '@providers/services/ocuppation/ocuppation.service';
import { UserEstablishmentService } from '@providers/services/user-establishment/user-establishment.service';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { Ocuppation } from '@shared/models/ocuppation/ocuppation.class';
import { UserEstablishment, UserEstablishmentWithPagination } from '@shared/models/user-establishment/user-establishment.class';
import {
  IUserEstablishmentAddRequest,
  IUserEstablishmentCreateRequestOrEdit
} from '@shared/models/user-establishment/user-establishment.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as UserEstablishmentStoreActions from './actions';
import {
  selectUserEstablishmentForDelete,
  selectUserEstablishmentForEdit,
  selectUsersEstablishmentAll
} from './selectors';

@Injectable()
export class UserEstablishmentStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly serviceUserEstablishment: UserEstablishmentService,
    private readonly serviceOcuppation: OcuppationService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getUsersEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishment),
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
        return this.serviceLocalEstablishment.getUsersEstablishment(establishment.id, query)
          .pipe(
            map((value: UserEstablishmentWithPagination) => UserEstablishmentStoreActions.getUsersEstablishmentSuccess({ data: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getUsersEstablishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentSuccess)
    ), { dispatch: false });

  getUsersEstablishmentOffEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentOff),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectUsersEstablishmentAll)),
              (initial, usersEstablishmentAll) => {
                return [query, usersEstablishmentAll];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, usersEstablishmentAll]: [IPagination, Array<UserEstablishment>]) => {
        let usersEstablishment = [];
        let usersEstablishmentBuff = _sort(usersEstablishmentAll, query.order);
        usersEstablishmentBuff = _chunck(usersEstablishmentBuff, query.limit);
        if (usersEstablishmentBuff.length >= query.page && query.page > 0) {
          usersEstablishment = usersEstablishmentBuff[query.page - 1];
        }

        return of([...usersEstablishment])
          .pipe(
            map((value: Array<UserEstablishment>) => UserEstablishmentStoreActions.getUsersEstablishmentOffSuccess({
              data: {
                data: value,
                page: query.page,
                perPage: query.limit,
                totalRecords: usersEstablishmentAll.length
              }
            })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getUsersEstablishmentOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentOffSuccess)
    ), { dispatch: false });

  getUsersEstablishmentAllEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentAll),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([establishment]: [LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getUsersEstablishment(establishment.id)
          .pipe(
            map((value: UserEstablishmentWithPagination) => UserEstablishmentStoreActions.getUsersEstablishmentAllSuccess({ data: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getUsersEstablishmentAllSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentAllSuccess)
    ), { dispatch: false });

  getUsersEstablishmentAllOffEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentAllOff),
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
        return this.serviceLocalEstablishment.getUsersEstablishment(establishment.id)
          .pipe(
            map((value: UserEstablishmentWithPagination) => UserEstablishmentStoreActions.getUsersEstablishmentAllOffSuccess({
              data: {
                ...value,
                page: query.page,
                perPage: query.limit
              }
            })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getUsersEstablishmentAllOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentAllOffSuccess)
    ), { dispatch: false });

  getUsersEstablishmentAllClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUsersEstablishmentAllClear)
    ), { dispatch: false });

  getUserEstablishmentByDocumentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentByDocument),
      map((action: { data: { documentTypeId: number, document: string } }) => action.data),
      switchMap((query: { documentTypeId: number, document: string }) => {
        return this.serviceUserEstablishment.getByDocument(query.documentTypeId, query.document)
          .pipe(
            map((value: UserEstablishment) => UserEstablishmentStoreActions.getUserEstablishmentByDocumentSuccess({ user: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getUserEstablishmentByDocumentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentByDocumentSuccess)
    ), { dispatch: false });

  getUserEstablishmentByDocumentClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentByDocumentClear)
    ), { dispatch: false });

  getUserEstablishmentByEmailEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentByEmail),
      map((action: { email: string }) => action.email),
      switchMap((email: string) => {
        return this.serviceUserEstablishment.getByEmail(email)
          .pipe(
            map((value: UserEstablishment) => UserEstablishmentStoreActions.getUserEstablishmentByEmailSuccess({ user: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getUserEstablishmentByEmailSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentByEmailSuccess)
    ), { dispatch: false });

  getUserEstablishmentByEmailClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentByEmailClear)
    ), { dispatch: false });

  getUserEstablishmentAppointmentHistoryEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(UserEstablishmentStoreActions.getUserEstablishmentAppointmentHistory),
    map((action: { userEstablishment: UserEstablishment }) => action.userEstablishment),
    switchMap((userEstablishment: UserEstablishment) => {
      return of([])
        .pipe(
          withLatestFrom(
            this.store$.pipe(select(selectEstablishment)),
            (initial, establishment) => {
              return [userEstablishment, establishment];
            }
          ),
          take(1)
        );
    }),
    switchMap(([userEstablishment, establishment]: [UserEstablishment, LocalEstablishment]) => {
      return this.serviceLocalEstablishment.getAppointmentHistory(userEstablishment.id, establishment.id)
        .pipe(
          map((value: Array<Appointment>) => UserEstablishmentStoreActions.
          getUserEstablishmentAppointmentHistorySuccess({ history: value })),
          catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
        );
    })
  ));

  getUserEstablishmentAppointmentHistorySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getUserEstablishmentAppointmentHistorySuccess)
    ), { dispatch: false });

  createUserEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.createUserEstablishment),
      map((action: { newUser: IUserEstablishmentCreateRequestOrEdit }) => action.newUser),
      switchMap((query: IUserEstablishmentCreateRequestOrEdit) => {
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
      switchMap(([query, establishment]: [IUserEstablishmentCreateRequestOrEdit, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.createUserEstablishment(establishment.id, query)
          .pipe(
            map((value: UserEstablishment) => UserEstablishmentStoreActions.createUserEstablishmentSuccess({ user: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  createUserEstablishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.createUserEstablishmentSuccess),
      switchMap(() => of(UserEstablishmentStoreActions.userEstablishmentSuccess({ data: new VMSuccess({ message: 'SFRON_UEST_001' }) })))
    ));

  deleteUserEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.deleteUserEstablishment),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectUserEstablishmentForDelete)),
              this.store$.pipe(select(selectEstablishment)),
              (initial, userEstablishment, establishment) => {
                return [userEstablishment, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([userEstablishment, establishment]: [UserEstablishment, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.deleteUserEstablishment(establishment.id, userEstablishment.id)
          .pipe(
            map((value: VMDelete) => UserEstablishmentStoreActions.deleteUserEstablishmentSuccess({ data: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  deleteUserEstablishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.deleteUserEstablishmentSuccess),
      switchMap(() => of(UserEstablishmentStoreActions.userEstablishmentSuccess({ data: new VMSuccess({ message: 'SFRON_UEST_004' }) })))
    ));

  addUserEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.addUserEstablishment),
      map((action: { newUser: IUserEstablishmentAddRequest }) => action.newUser),
      switchMap((query: IUserEstablishmentAddRequest) => {
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
      switchMap(([query, establishment]: [IUserEstablishmentAddRequest, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.addUserEstablishment(
          establishment.id,
          query.id,
          query
        )
          .pipe(
            map((value: UserEstablishment) => UserEstablishmentStoreActions.addUserEstablishmentSuccess({ user: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  addUserEstablishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.addUserEstablishmentSuccess),
      switchMap(() => of(UserEstablishmentStoreActions.userEstablishmentSuccess({ data: new VMSuccess({ message: 'SFRON_UEST_002' }) })))
    ));

  updateUserEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.updateUserEstablishment),
      map((action: { newUser: IUserEstablishmentCreateRequestOrEdit }) => action.newUser),
      switchMap((query: IUserEstablishmentCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              this.store$.pipe(select(selectUserEstablishmentForEdit)),
              (initial, establishment, userEstablishment) => {
                return [query, establishment, userEstablishment];
              }
            ),
            take(1)
          );
      }),
      // tslint:disable-next-line: max-line-length
      switchMap(([query, establishment, userEstablishment]: [IUserEstablishmentCreateRequestOrEdit, LocalEstablishment, UserEstablishment]) => {
        return this.serviceLocalEstablishment.updateUserEstablishment(establishment.id, userEstablishment.id, query)
          .pipe(
            map((value: UserEstablishment) => UserEstablishmentStoreActions.updateUserEstablishmentSuccess({ user: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  updateUserEstablishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.updateUserEstablishmentSuccess),
      switchMap(() => of(UserEstablishmentStoreActions.userEstablishmentSuccess({ data: new VMSuccess({ message: 'SFRON_UEST_003' }) })))
    ));

  getOcuppationsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getOcuppations),
      switchMap(() => {
        return this.serviceOcuppation.get()
          .pipe(
            map((value: Array<Ocuppation>) => UserEstablishmentStoreActions.getOcuppationsSuccess({ occupations: value })),
            catchError((error: VMError) => of(UserEstablishmentStoreActions.userEstablishmentFailure({ data: error })))
          );
      })
    ));

  getOcuppationsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.getOcuppationsSuccess)
    ), { dispatch: false });

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalHistoryOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalHistoryOpen)
    ), { dispatch: false });

  modalHistoryCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalHistoryClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.modalEditClose)
    ), { dispatch: false });

  userEstablishmentFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.userEstablishmentFailure),
      switchMap(() => of(UserEstablishmentStoreActions.errorToNull()))
    ));

  userEstablishmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.userEstablishmentSuccess),
      switchMap(() => of(UserEstablishmentStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.successToNull)
    ), { dispatch: false });

  clearUserEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentStoreActions.clearUserEstablishment)
    ), { dispatch: false });
}
