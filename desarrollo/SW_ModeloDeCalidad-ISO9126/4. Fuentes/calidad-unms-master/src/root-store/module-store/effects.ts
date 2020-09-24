import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { ModuleService } from '@providers/services/module/module.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { Module } from '@shared/models/module/module.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as ModuleStoreActions from './actions';

@Injectable()
export class ModuleStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceModule: ModuleService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getModulesEffect = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.getModules),
      switchMap(() => {
        return this.serviceModule.get()
          .pipe(
            map((value: Array<Module>) => ModuleStoreActions.getModulesSuccess({ modules: value })),
            catchError((error: VMError) => of(ModuleStoreActions.moduleFailure({ data: error })))
          );
      })
    ));

  getModulesSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.getModulesSuccess)
    ), { dispatch: false });

  getModulesEnabledEffect = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.getModulesEnabled),
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
        return this.serviceModule.getByEstablishment(establishment.id)
          .pipe(
            map((value: Array<number>) => ModuleStoreActions.getModulesEnabledSuccess({ modulesId: value })),
            catchError((error: VMError) => of(ModuleStoreActions.moduleFailure({ data: error })))
          );
      })
    ));

  getModulesEnabledSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.getModulesEnabledSuccess)
    ), { dispatch: false });

  moduleFaillureEffect = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.moduleFailure),
      switchMap(() => of(ModuleStoreActions.errorToNull()))
    ));

  moduleSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.moduleSuccess),
      switchMap(() => of(ModuleStoreActions.successToNull()))
    ));

  errorToNull$ = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.errorToNull)
    ), { dispatch: false });

  successToNull$ = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.successToNull)
    ), { dispatch: false });

  clearModule$ = createEffect(() => this.actions$
    .pipe(
      ofType(ModuleStoreActions.clearModule)
    ), { dispatch: false });

}
