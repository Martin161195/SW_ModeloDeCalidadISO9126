import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { UserEstablishmentScheduleService } from '@providers/services/user-establishment-schedule/user-establishment-schedule.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
import { IQueryForGetSchedules, IUserEstablishmentScheduleCreateRequestOrEdit } from '@shared/models/user-establishment-schedule/user-establishment-schedule.interface';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as UserEstablishmentScheduleStoreActions from './actions';
import { selectUserEstablishment, selectUserEstablishmentScheduleForEdit } from './selectors';

@Injectable()
export class UserEstablishmentScheduleStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly serviceUserEstablishmentSchedule: UserEstablishmentScheduleService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getUserEstablishmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.getUserEstablishment),
      map((action: { userEstablishmentId: number }) => action.userEstablishmentId),
      switchMap((userEstablishmentId: number) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [establishment.id, userEstablishmentId];
              }
            ),
            take(1)
          );
      }),
      switchMap(([localEstablishmentId, userEstablishmentId]: [number, number]) => {
        return this.serviceLocalEstablishment.getUserEstablishment(localEstablishmentId, userEstablishmentId)
          .pipe(
            map((value: UserEstablishment) => UserEstablishmentScheduleStoreActions
              .getUserEstablishmentSuccess({ userEstablishment: value })),
            catchError((error: VMError) => of(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleFailure({ data: error })))
          );
      })
    ));

  getUserEstablishmentSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.getUserEstablishmentSuccess)
    ), { dispatch: false });

  getUserEstablishmentSchedulesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.getUserEstablishmentSchedules),
      map((action: { query: IQueryForGetSchedules }) => action.query),
      switchMap((query: IQueryForGetSchedules) => {
        return this.serviceLocalEstablishment.getSchedulesUserEstablishment(
          query.localEstablishmentId,
          query.userEstablishmentId,
          query.min,
          query.max
        )
          .pipe(
            map((value: Array<UserEstablishmentSchedule>) => UserEstablishmentScheduleStoreActions
              .getUserEstablishmentSchedulesSuccess({ schedules: value })),
            catchError((error: VMError) => of(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleFailure({ data: error })))
          );
      })
    ));

  getUserEstablishmentSchedulesSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.getUserEstablishmentSchedulesSuccess)
    ), { dispatch: false });

  createUserEstablishmentScheduleEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.createUserEstablishmentSchedule),
      map((action: { newSchedule: IUserEstablishmentScheduleCreateRequestOrEdit }) => action.newSchedule),
      switchMap((data: IUserEstablishmentScheduleCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              this.store$.pipe(select(selectUserEstablishment)),
              (initial, establishment, user) => {
                return [data, establishment, user];
              }
            ),
            take(1)
          );
      }),
      switchMap(([data, establishment, user]: [IUserEstablishmentScheduleCreateRequestOrEdit, LocalEstablishment, UserEstablishment]) => {
        return this.serviceUserEstablishmentSchedule.create(establishment.id, user.id, data)
          .pipe(
            map((value: UserEstablishmentSchedule) => UserEstablishmentScheduleStoreActions
              .createUserEstablishmentScheduleSuccess({ schedule: value })),
            catchError((error: VMError) => of(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleFailure({ data: error })))
          );
      })
    ));

  createUserEstablishmentScheduleSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.createUserEstablishmentScheduleSuccess),
      switchMap(() => of(UserEstablishmentScheduleStoreActions
        .userEstablishmentScheduleSuccess({ data: new VMSuccess({ message: 'SFRON_UESTSCH_001' }) })))
    ));

  updateUserEstablishmentScheduleEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.updateUserEstablishmentSchedule),
      map((action: { newSchedule: IUserEstablishmentScheduleCreateRequestOrEdit }) => action.newSchedule),
      switchMap((query: IUserEstablishmentScheduleCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              this.store$.pipe(select(selectUserEstablishment)),
              this.store$.pipe(select(selectUserEstablishmentScheduleForEdit)),
              (initial, establishment, user, schedule) => {
                return [query, establishment, user, schedule];
              }
            ),
            take(1)
          );
      }),
      // tslint:disable-next-line:max-line-length
      switchMap(([query, establishment, user, schedule]: [IUserEstablishmentScheduleCreateRequestOrEdit, LocalEstablishment, UserEstablishment, UserEstablishmentSchedule]) => {
        // tslint:disable-next-line:max-line-length
        return this.serviceLocalEstablishment.updateScheduleUserEstablishment(establishment.id, user.id, schedule.id, query)
          .pipe(
            map((value: UserEstablishmentSchedule) => UserEstablishmentScheduleStoreActions
              .updateUserEstablishmentScheduleSuccess({ schedule: value })),
            catchError((error: VMError) => of(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleFailure({ data: error })))
          );
      })
    ));

  updateServiceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.updateUserEstablishmentScheduleSuccess),
      switchMap(() => of(UserEstablishmentScheduleStoreActions
        .userEstablishmentScheduleSuccess({ data: new VMSuccess({ message: 'SFRON_UESTSCH_002' }) })))
    ));

  modalCreateOpenEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.modalEditClose)
    ), { dispatch: false });

  userEstablishmentScheduleFailureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleFailure),
      switchMap(() => of(UserEstablishmentScheduleStoreActions.errorToNull()))
    ));

  userEstablishmentScheduleSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.userEstablishmentScheduleSuccess),
      switchMap(() => of(UserEstablishmentScheduleStoreActions.successToNull()))
    ));

  errorToNullEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.successToNull)
    ), { dispatch: false });

  clearQueryForGetSchedulesEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.clearQueryForGetSchedules)
    ), { dispatch: false });

  clearUserEstablishmentScheduleEffect = createEffect(() => this.actions$
    .pipe(
      ofType(UserEstablishmentScheduleStoreActions.clearUserEstablishmentSchedule)
    ), { dispatch: false });

}
