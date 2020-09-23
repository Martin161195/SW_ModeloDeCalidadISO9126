import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalService } from '@providers/services/local/local.service';
import { LocalBusinessInformation, LocalGeneralInformation, LocalResponse } from '@shared/models/local/local.class';
import { ILocalBusinessForm, ILocalGeneralInformationEditRequest, ILocalStatusEditRequest } from '@shared/models/local/local.interface';
import { Plan } from '@shared/models/plan/plan.class';
import { IPlanUpdateRequest } from '@shared/models/plan/plan.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as LocalStoreActions from './actions';

@Injectable()
export class LocalStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceLocal: LocalService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getLocal$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.getLocal),
      switchMap(() => {
        return this.serviceLocal.getInformation()
          .pipe(
            map((value: LocalResponse) => LocalStoreActions.getLocalSuccess({ local: value })),
            catchError((error: VMError) => of(LocalStoreActions.localFailure({ data: error })))
          );
      })
    ));

  getLocalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.getLocalSuccess)
    ), { dispatch: false });

  updateLocal$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updateLocal),
      map((action: { newLocal: ILocalGeneralInformationEditRequest }) => action.newLocal),
      switchMap((query: ILocalGeneralInformationEditRequest) => {
        return this.serviceLocal.updateInformation(query)
          .pipe(
            map((value: LocalGeneralInformation) => LocalStoreActions.updateLocalSuccess({ local: value })),
            catchError((error: VMError) => of(LocalStoreActions.localFailure({ data: error })))
          );
      })
    ));

  updateLocalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updateLocalSuccess),
      switchMap(() => of(LocalStoreActions.localSuccess({ data: new VMSuccess({ message: 'SFRON_LOCAL_001' }) })))
    ));

  updateLocalStatus$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updateLocalStatus),
      map((action: { newLocal: ILocalStatusEditRequest }) => action.newLocal),
      switchMap((query: ILocalStatusEditRequest) => {
        return this.serviceLocal.updateStatus(query)
          .pipe(
            map((value: LocalResponse) => LocalStoreActions.updateLocalStatusSuccess({ local: value })),
            catchError((error: VMError) => of(LocalStoreActions.localFailure({ data: error })))
          );
      })
    ));

  updateLocalStatusSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updateLocalStatusSuccess),
      switchMap(() => of(LocalStoreActions.localSuccess({ data: new VMSuccess({ message: 'SFRON_LOCAL_002' }) })))
    ));

  updateLocalBusiness$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updateLocalBusiness),
      map((action: { newLocal: ILocalBusinessForm }) => action.newLocal),
      switchMap((query: ILocalBusinessForm) => {
        return this.serviceLocal.updateBusiness(query)
          .pipe(
            map((value: LocalBusinessInformation) => LocalStoreActions.updateLocalBusinessSuccess({ local: value })),
            catchError((error: VMError) => of(LocalStoreActions.localFailure({ data: error })))
          );
      })
    ));

  updateLocalBusinessSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updateLocalBusinessSuccess),
      switchMap(() => of(LocalStoreActions.localSuccess({ data: new VMSuccess({ message: 'SFRON_LOCAL_003' }) })))
    ));

  setPlanEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.setPlan)
    ), { dispatch: false });

  getPlanEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.getPlan),
      switchMap(() => this.serviceLocal.getPlan()
        .pipe(
          tap((plan: Plan) => { this.serviceLocal.setPlanInner(plan); }),
          map((response: Plan) => LocalStoreActions.getPlanSuccess({ plan: response })),
          catchError((error: VMError) => of(LocalStoreActions.localFailure({ data: error })))
        ))
    ));

  getPlanSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.getPlanSuccess)
    ), { dispatch: false });

  updatePlanEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updatePlan),
      map((action: { newPlan: IPlanUpdateRequest }) => action.newPlan),
      switchMap((newPlan: IPlanUpdateRequest) => this.serviceLocal.updatePlan(newPlan)
        .pipe(
          map((response: Plan) => LocalStoreActions.updatePlanSuccess({ plan: response })),
          catchError((error: VMError) => of(LocalStoreActions.localFailure({ data: error })))
        ))
    ));

  updatePlanSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.updatePlanSuccess),
      switchMap(() => of(LocalStoreActions.localSuccess({ data: new VMSuccess({ message: 'SFRON_LOCAL_004' }) })))
    ));

  localFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.localFailure),
      switchMap(() => of(LocalStoreActions.errorToNull()))
    ));

  localSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.localSuccess),
      switchMap(() => of(LocalStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.successToNull)
    ), { dispatch: false });

  clearPlanEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.clearPlan)
    ), { dispatch: false });

  clearLocalEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(LocalStoreActions.clearLocal)
    ), { dispatch: false });

}
