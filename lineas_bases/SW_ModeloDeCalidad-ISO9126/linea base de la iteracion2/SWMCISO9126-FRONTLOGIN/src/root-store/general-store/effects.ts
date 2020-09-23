import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentTypeService } from '@providers/services/document-type/document-type.service';
import { PlanService } from '@providers/services/plan/plan.service';
import { IMenuSidebar } from '@shared/common/interfaces/menu-sidebar.interface';
import { DocumentType } from '@shared/models/document-type/document-type.class';
import { Plan } from '@shared/models/plan/plan.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import * as GeneralStoreActions from './actions';

@Injectable()
export class GeneralStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly documentTypeService: DocumentTypeService,
    private readonly planService: PlanService
  ) { }

  sidebarDesktopOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.sidebarDesktopOpen)
    ), { dispatch: false });

  sidebarDesktopCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.sidebarDesktopClose)
    ), { dispatch: false });

  clickButtonRefreshInitEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.clickButtonRefreshInit),
      delay(250),
      switchMap(() => of(GeneralStoreActions.clickButtonRefreshEnd()))
    ));

  clickButtonRefreshEndEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.clickButtonRefreshEnd)
    ), { dispatch: false });

  menuSidebarInitEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.menuSidebarInit),
      map((action: { items: Array<IMenuSidebar> }) => action.items)
    ), { dispatch: false });

  menuSidebarDestroyEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.menuSidebarDestroy)
    ), { dispatch: false });

  getDocumentTypesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.getDocumentTypes),
      switchMap(() => {
        return this.documentTypeService.get()
          .pipe(
            map((value: Array<DocumentType>) => GeneralStoreActions.getDocumentTypesSuccess({ documentTypes: value })),
            catchError((error: VMError) => of(GeneralStoreActions.generalFailure({ data: error })))
          );
      })
    ));

  getDocumentTypesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.getDocumentTypesSuccess)
    ), { dispatch: false });

  getPlanesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.getPlanes),
      switchMap(() => {
        return this.planService.get()
          .pipe(
            map((value: Array<Plan>) => GeneralStoreActions.getPlanesSuccess({ planes: value })),
            catchError((error: VMError) => of(GeneralStoreActions.generalFailure({ data: error })))
          );
      })
    ));

  openAlertPlanEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.openAlertPlan)
    ), { dispatch: false });

  closeAlertPlanEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.closeAlertPlan)
    ), { dispatch: false });

  getPlanesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.getPlanesSuccess)
    ), { dispatch: false });

  generalFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.generalFailure),
      switchMap(() => of(GeneralStoreActions.errorToNull()))
    ));

  generalSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.generalSuccess),
      switchMap(() => of(GeneralStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.successToNull)
    ), { dispatch: false });

  clearGeneralEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralStoreActions.clearGeneral)
    ), { dispatch: false });

}
