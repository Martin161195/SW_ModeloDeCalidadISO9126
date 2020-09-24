import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { StatusAppointmentService } from '@providers/services/status-appointment/status-appointment.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { StatusAppointment } from '@shared/models/status-appointment/status-appointment.class';
import { IStatusAppointmentUpdateRequest } from '@shared/models/status-appointment/status-appointment.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as StatusAppointmentStoreActions from './actions';

@Injectable()
export class StatusAppointmentStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceStatusAppointment: StatusAppointmentService,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getStatusAppointmentsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.getStatusAppointments),
      switchMap(() => {
        return this.serviceStatusAppointment.get()
          .pipe(
            // tslint:disable-next-line: max-line-length
            map((value: Array<StatusAppointment>) => StatusAppointmentStoreActions.getStatusAppointmentsSuccess({ appointmentStatus: value })),
            catchError((error: VMError) => of(StatusAppointmentStoreActions.statusAppointmentFailure({ data: error })))
          );
      })
    ));

  getStatusAppointmentsSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.getStatusAppointmentsSuccess)
    ), { dispatch: false });

  getEstablishmentStatusAppointmentsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.getEstablishmentStatusAppointments),
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
      switchMap(([establishment]) => {
        return this.serviceLocalEstablishment.getStatusAppointments(establishment.id)
          .pipe(
            // tslint:disable-next-line: max-line-length
            map((value: Array<StatusAppointment>) => StatusAppointmentStoreActions.getEstablishmentStatusAppointmentsSuccess({ appointmentStatus: value })),
            catchError((error: VMError) => of(StatusAppointmentStoreActions.statusAppointmentFailure({ data: error })))
          );
      })
    ));

  getEstablishmentStatusAppointmentsSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.getEstablishmentStatusAppointmentsSuccess)
    ), { dispatch: false });

  updateEstablishmentStatusAppointmentsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.updateEstablishmentStatusAppointments),
      map((action: { newAppointmentStatus: Array<IStatusAppointmentUpdateRequest> }) => action.newAppointmentStatus),
      switchMap((statusAppointments: Array<IStatusAppointmentUpdateRequest>) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [statusAppointments, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([statusAppointments, establishment]: [Array<IStatusAppointmentUpdateRequest>, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.updateStatusAppointments(establishment.id, statusAppointments)
          .pipe(
            // tslint:disable-next-line: max-line-length
            map((value: Array<StatusAppointment>) => StatusAppointmentStoreActions.updateEstablishmentStatusAppointmentsSuccess({ appointmentStatus: value })),
            catchError((error: VMError) => of(StatusAppointmentStoreActions.statusAppointmentFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentStatusAppointmentsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.updateEstablishmentStatusAppointmentsSuccess),
      switchMap(() => of(StatusAppointmentStoreActions.statusAppointmentSuccess({ data: new VMSuccess({ message: 'SFRON_LESA_001' }) })))
    ));

  statusAppointmentFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.statusAppointmentFailure),
      switchMap(() => of(StatusAppointmentStoreActions.errorToNull()))
    ));

  statusAppointmentSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.statusAppointmentSuccess),
      switchMap(() => of(StatusAppointmentStoreActions.successToNull()))
    ));

  errorToNullEffect = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.successToNull)
    ), { dispatch: false });

  clearstatusAppointmentEffect = createEffect(() => this.actions$
    .pipe(
      ofType(StatusAppointmentStoreActions.clearStatusAppointment)
    ), { dispatch: false });

}
