import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TypeOfApplicationService } from '@providers/services/type-of-application/type-of-application.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { TypeOfApplication } from '@shared/models/type-of-application/type-of-application.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as TypeOfApplicationStoreActions from './actions';

@Injectable()
export class TypeOfApplicationStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceTypeOfApplication: TypeOfApplicationService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getTypeOfApplicationsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.getTypeOfApplications),
      switchMap(() => {
        return this.serviceTypeOfApplication.get()
          .pipe(
            map((value: Array<TypeOfApplication>) => TypeOfApplicationStoreActions.getTypeOfApplicationsSuccess({ applications: value })),
            catchError((error: VMError) => of(TypeOfApplicationStoreActions.typeOfApplicationFailure({ data: error })))
          );
      })
    ));

  getTypeOfApplicationsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.getTypeOfApplicationsSuccess)
    ), { dispatch: false });

  getEstablishmentTypeOfApplicationsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.getEstablishmentTypeOfApplications),
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
        return this.serviceTypeOfApplication.getByEstablishment(establishment.id)
          .pipe(
            map((value: Array<TypeOfApplication>) => TypeOfApplicationStoreActions
              .getEstablishmentTypeOfApplicationsSuccess({ applications: value })),
            catchError((error: VMError) => of(TypeOfApplicationStoreActions.typeOfApplicationFailure({ data: error })))
          );
      })
    ));

  getEstablishmentTypeOfApplicationsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.getEstablishmentTypeOfApplicationsSuccess)
    ), { dispatch: false });

  typeOfApplicationFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.typeOfApplicationFailure),
      switchMap(() => of(TypeOfApplicationStoreActions.errorToNull()))
    ));

  typeOfApplicationSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.typeOfApplicationSuccess),
      switchMap(() => of(TypeOfApplicationStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.successToNull)
    ), { dispatch: false });

  clearTypeOfApplicationEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TypeOfApplicationStoreActions.clearTypeOfApplication)
    ), { dispatch: false });

}
