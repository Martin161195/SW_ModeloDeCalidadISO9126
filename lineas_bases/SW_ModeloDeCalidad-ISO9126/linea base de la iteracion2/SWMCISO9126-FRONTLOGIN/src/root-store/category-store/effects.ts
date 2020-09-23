import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { CategoryService } from '@providers/services/category/category.service';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { Category } from '@shared/models/category/category.class';
import { ICategoryUpdateRequest } from '@shared/models/category/category.interface';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as CategoryStoreActions from './actions';

@Injectable()
export class CategoryStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceCategory: CategoryService,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getCategoriesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.getCategories),
      switchMap(() => {
        return this.serviceCategory.get()
          .pipe(
            map((value: Array<Category>) => CategoryStoreActions.getCategoriesSuccess({ categories: value })),
            catchError((error: VMError) => of(CategoryStoreActions.categoryFailure({ data: error })))
          );
      })
    ));

  getCategoriesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.getCategoriesSuccess)
    ), { dispatch: false });

  getEstablishmentCategoriesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.getEstablishmentCategories),
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
        return this.serviceLocalEstablishment.getCategories(establishment.id)
          .pipe(
            map((value: Array<Category>) => CategoryStoreActions.getEstablishmentCategoriesSuccess({ categories: value })),
            catchError((error: VMError) => of(CategoryStoreActions.categoryFailure({ data: error })))
          );
      })
    ));

  getEstablishmentCategoriesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.getEstablishmentCategoriesSuccess)
    ), { dispatch: false });

  updateEstablishmentCategoriesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.updateEstablishmentCategories),
      map((action: { data: Array<ICategoryUpdateRequest> }) => action.data),
      switchMap((categories: Array<ICategoryUpdateRequest>) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [categories, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([categories, establishment]: [Array<ICategoryUpdateRequest>, LocalEstablishment]) => {
        // tslint:disable-next-line:max-line-length
        return this.serviceLocalEstablishment.updateCategories(establishment.id, categories)
          .pipe(
            map((value: Array<Category>) => CategoryStoreActions.updateEstablishmentCategoriesSuccess({ categories: value })),
            catchError((error: VMError) => of(CategoryStoreActions.categoryFailure({ data: error })))
          );
      })
    ));

  updateEstablishmentCategoriesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.updateEstablishmentCategoriesSuccess),
      switchMap(() => of(CategoryStoreActions.categorySuccess({ data: new VMSuccess({ message: 'SFRON_LECAT_001' }) })))
    ));

  categoryFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.categoryFailure),
      switchMap(() => of(CategoryStoreActions.errorToNull()))
    ));

  categorySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.categorySuccess),
      switchMap(() => of(CategoryStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.successToNull)
    ), { dispatch: false });

  clearCategoryEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(CategoryStoreActions.clearCategory)
    ), { dispatch: false });

}
