import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppointmentService } from '@providers/services/appointment/appointment.service';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IAppointmentCreateRequest, IAppointmentEditRequest, IQueryForGetAppointments } from '@shared/models/appointment/appointment.interface';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { EstablishmentStoreSelectors } from '@store/establishment-store';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as AppointmentStoreActions from './actions';
import {
  selectAppointmentForDelete,
  selectAppointmentForEdit
} from './selectors';

@Injectable()
export class AppointmentStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceAppointment: AppointmentService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getAppointmentsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.getAppointments),
      map((action: { query: IQueryForGetAppointments }) => action.query),
      switchMap((query: IQueryForGetAppointments) => {
        return this.serviceAppointment.getByEstablishment(query)
          .pipe(
            map((value: Array<Appointment>) => AppointmentStoreActions.getAppointmentsSuccess({ appointments: value })),
            catchError((error: VMError) => of(AppointmentStoreActions.appointmentFailure({ data: error })))
          );
      })
    ));

  getAppointmentsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.getAppointmentsSuccess)
    ), { dispatch: false });

  getAppointmentsByUserAppNotVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.getAppointmentsByUserAppNotVoucher),
      map((action: { userAppId: number }) => action.userAppId),
      switchMap((userAppId: number) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(EstablishmentStoreSelectors.selectEstablishment)),
              (initial, establishment) => {
                return [userAppId, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([userAppId, localEstablishment]: [number, LocalEstablishment]) => {
        return this.serviceAppointment.getByUserAppNotVoucher({ userAppId, localEstablishmentId: localEstablishment.id })
          .pipe(
            map((value: Array<Appointment>) => AppointmentStoreActions.getAppointmentsByUserAppNotVoucherSuccess({ appointments: value })),
            catchError((error: VMError) => of(AppointmentStoreActions.appointmentFailure({ data: error })))
          );
      })
    ));

  getAppointmentsByUserAppNotVoucherSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.getAppointmentsByUserAppNotVoucherSuccess)
    ), { dispatch: false });

  clearGetAppointmentsByUserAppNotVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.clearGetAppointmentsByUserAppNotVoucher)
    ), { dispatch: false });

  addAppointmentByUserToVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.addAppointmentByUserToVoucher)
    ), { dispatch: false });

  removeAppointmentByUserToVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.removeAppointmentByUserToVoucher)
    ), { dispatch: false });

  createManyAppointmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.createManyAppointment),
      map((action: { newAppointment: IAppointmentCreateRequest }) => action.newAppointment),
      switchMap((data: IAppointmentCreateRequest) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(EstablishmentStoreSelectors.selectEstablishment)),
              (initial, establishment) => {
                return [data, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([data, establishment]: [IAppointmentCreateRequest, LocalEstablishment]) => {
        return this.serviceAppointment.createMany(establishment.id, data)
          .pipe(
            map((value: Array<Appointment>) => AppointmentStoreActions.createManyAppointmentSuccess({ appointments: value })),
            catchError((error: VMError) => of(AppointmentStoreActions.appointmentFailure({ data: error })))
          );
      })
    ));

  createManyAppointmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.createManyAppointmentSuccess),
      switchMap(() => of(AppointmentStoreActions.appointmentSuccess({ data: new VMSuccess({ message: 'SFRON_APPOINT_001' }) })))
    ));

  deleteAppointmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.deleteAppointment),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectAppointmentForDelete)),
              (initial, appointment) => {
                return [appointment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([appointment]: [Appointment]) => {
        return this.serviceAppointment.delete(appointment.id)
          .pipe(
            map((value: VMDelete) => AppointmentStoreActions.deleteAppointmentSuccess({ data: value })),
            catchError((error: VMError) => of(AppointmentStoreActions.appointmentFailure({ data: error })))
          );
      })
    ));

  deleteAppointmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.deleteAppointmentSuccess),
      switchMap(() => of(AppointmentStoreActions.appointmentSuccess({ data: new VMSuccess({ message: 'SFRON_APPOINT_003' }) })))
    ));

  updateAppointmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.updateAppointment),
      map((action: { newAppointment: IAppointmentEditRequest }) => action.newAppointment),
      switchMap((query: IAppointmentEditRequest) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectAppointmentForEdit)),
              (initial, appointment) => {
                return [query, appointment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, appointment]: [IAppointmentEditRequest, Appointment]) => {
        return this.serviceAppointment.update(appointment.id, query)
          .pipe(
            map((value: Appointment) => AppointmentStoreActions.updateAppointmentSuccess({ appointment: value })),
            catchError((error: VMError) => of(AppointmentStoreActions.appointmentFailure({ data: error })))
          );
      })
    ));

  updateAppointmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.updateAppointmentSuccess),
      switchMap(() => of(AppointmentStoreActions.appointmentSuccess({ data: new VMSuccess({ message: 'SFRON_APPOINT_001' }) })))
    ));

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.modalEditClose)
    ), { dispatch: false });

  alertDeleteOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.alertDeleteOpen)
    ), { dispatch: false });

  alertDeleteCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.alertDeleteClose)
    ), { dispatch: false });

  appointmentFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.appointmentFailure),
      switchMap(() => of(AppointmentStoreActions.errorToNull()))
    ));

  appointmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.appointmentSuccess),
      switchMap(() => of(AppointmentStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.successToNull)
    ), { dispatch: false });

  clearQueryForGetAppointmentsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.clearQueryForGetAppointments)
    ), { dispatch: false });

  clearAppointmentEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(AppointmentStoreActions.clearAppointment)
    ), { dispatch: false });

}
