import { Injectable } from '@angular/core';
import { _chunck, _sort } from '@core/common/helpers-array';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { PromotionService } from '@providers/services/promotion/promotion.service';
import { UserAppService } from '@providers/services/user-app/user-app.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { Promotion, PromotionWithPagination } from '@shared/models/promotion/promotion.class';
import { IPromotionCreate, IPromotionEdit, IUserPromotionByCode } from '@shared/models/promotion/promotion.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as PromotionStoreActions from './actions';
import {
  selectPromotionForDelete,
  selectPromotionForEdit,
  selectPromotionsAll
} from './selectors';

@Injectable()
export class PromotionStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly servicePromotion: PromotionService,
    private readonly serviceUserApp: UserAppService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getPromotionsEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getPromotions),
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
        return this.serviceLocalEstablishment.getPromotions(establishment.id, query)
          .pipe(
            map((value: PromotionWithPagination) => PromotionStoreActions.getPromotionsSuccess({ promotions: value })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  getPromotionSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getPromotionsSuccess)
    ), { dispatch: false });

  getPromotionsOffEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getPromotionsOff),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectPromotionsAll)),
              (initial, promotionsAll) => {
                return [query, promotionsAll];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, promotionsAll]: [IPagination, Array<Promotion>]) => {
        let promotions = [];
        let promotionsBuff = _sort(promotionsAll, query.order);
        promotionsBuff = _chunck(promotionsBuff, query.limit);
        if (promotionsBuff.length >= query.page && query.page > 0) {
          promotions = promotionsBuff[query.page - 1];
        }

        return of([...promotions])
          .pipe(
            map((value: Array<Promotion>) => PromotionStoreActions.getPromotionsOffSuccess({
              promotions: {
                data: value,
                page: query.page,
                perPage: query.limit,
                totalRecords: promotionsAll.length
              }
            })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  getPromotionOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getPromotionsOffSuccess)
    ), { dispatch: false });

  getPromotionsAllOffEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getPromotionsAllOff),
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
        return this.serviceLocalEstablishment.getPromotions(establishment.id)
          .pipe(
            map((value: PromotionWithPagination) => PromotionStoreActions.getPromotionsAllOffSuccess({
              promotions: {
                ...value,
                page: query.page,
                perPage: query.limit
              }
            })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  getPromotionsAllOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getPromotionsAllOffSuccess)
    ), { dispatch: false });

  getUserPromotionByCodeEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getUserPromotionByCode),
      map((action: { query: IUserPromotionByCode }) => action.query),
      switchMap((query: IUserPromotionByCode) => {
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
      switchMap(([query, establishment]: [IUserPromotionByCode, LocalEstablishment]) => {
        return this.serviceUserApp.getPromotionByCode(query.userAppId, establishment.id, query.code)
          .pipe(
            map((value: Promotion) => PromotionStoreActions.getUserPromotionByCodeSuccess({ promotion: value })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  getUserPromotionByCodeSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.getUserPromotionByCodeSuccess)
    ), { dispatch: false });

  clearUserPromotionByCodeEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.clearUserPromotionByCode)
    ), { dispatch: false });

  createPromotionEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.createPromotion),
      map((action: { newPromotion: IPromotionCreate }) => action.newPromotion),
      switchMap((newPromotion: IPromotionCreate) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [newPromotion, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([newPromotion, establishment]: [IPromotionCreate, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.createPromotion(establishment.id, newPromotion)
          .pipe(
            map((value: Promotion) => PromotionStoreActions.createPromotionSuccess({ promotion: value })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  createPromotionSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.createPromotionSuccess),
      switchMap(() => of(PromotionStoreActions.promotionSuccess({ data: new VMSuccess({ message: 'SFRON_PROM_001' }) })))
    ));

  deletePromotionEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.deletePromotion),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectPromotionForDelete)),
              (initial, promotion) => {
                return [promotion];
              }
            ),
            take(1)
          );
      }),
      switchMap(([promotion]: [Promotion]) => {
        return this.servicePromotion.delete(promotion.id)
          .pipe(
            map((value: VMDelete) => PromotionStoreActions.deletePromotionSuccess({ data: value })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  deletePromotionSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.deletePromotionSuccess),
      switchMap(() => of(PromotionStoreActions.promotionSuccess({ data: new VMSuccess({ message: 'SFRON_PROM_003' }) })))
    ));

  updatePromotionEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.updatePromotion),
      map((action: { newPromotion: IPromotionEdit }) => action.newPromotion),
      switchMap((newPromotion: IPromotionEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectPromotionForEdit)),
              (initial, promotion) => {
                return [newPromotion, promotion];
              }
            ),
            take(1)
          );
      }),
      switchMap(([newPromotion, promotion]: [IPromotionEdit, Promotion]) => {
        return this.servicePromotion.update(promotion.id, newPromotion)
          .pipe(
            map((value: Promotion) => PromotionStoreActions.updatePromotionSuccess({ promotion: value })),
            catchError((error: VMError) => of(PromotionStoreActions.promotionFailure({ data: error })))
          );
      })
    ));

  updatePromotionSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.updatePromotionSuccess),
      switchMap(() => of(PromotionStoreActions.promotionSuccess({ data: new VMSuccess({ message: 'SFRON_PROM_002' }) })))
    ));

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.modalEditClose)
    ), { dispatch: false });

  alertDeleteOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.alertDeleteOpen)
    ), { dispatch: false });

  alertDeleteCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.alertDeleteClose)
    ), { dispatch: false });

  promotionFaillureEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.promotionFailure),
      switchMap(() => of(PromotionStoreActions.errorToNull()))
    ));

  promotionSuccessEffect = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.promotionSuccess),
      switchMap(() => of(PromotionStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.successToNull)
    ), { dispatch: false });

  clearPromotionEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(PromotionStoreActions.clearPromotion)
    ), { dispatch: false });

}
