import { Injectable } from '@angular/core';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { VoucherService } from '@providers/services/voucher/voucher.service';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { Voucher, VoucherWithPagination } from '@shared/models/voucher/voucher.class';
import { IVoucherCreateRequest, IVoucherCreateRequestOrEdit } from '@shared/models/voucher/voucher.interface';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as VoucherStoreActions from './actions';
import {
  selectVoucherForDelete,
  selectVoucherForEdit
} from './selectors';

@Injectable()
export class VoucherStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceVoucher: VoucherService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getVouchersEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.getVouchers),
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
        return this.serviceVoucher.getByEstablishment(establishment.id, query)
          .pipe(
            map((value: VoucherWithPagination) => VoucherStoreActions.getVouchersSuccess({ vouchers: value })),
            catchError((error: VMError) => of(VoucherStoreActions.voucherFailure({ data: error })))
          );
      })
    ));

  getVouchersSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.getVouchersSuccess)
    ), { dispatch: false });

  createVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.createVoucher),
      map((action: { data: { data: IVoucherCreateRequest, userAppId: number } }) => action.data),
      switchMap((query: { data: IVoucherCreateRequest, userAppId: number }) => {
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
      switchMap(([query, establishment]: [{ data: IVoucherCreateRequest, userAppId: number }, LocalEstablishment]) => {
        return this.serviceVoucher.createByEstablishment(establishment.id, query.userAppId, query.data)
          .pipe(
            map((value: IVoucherCreateRequest) => VoucherStoreActions.createVoucherSuccess({ voucher: value })),
            catchError((error: VMError) => of(VoucherStoreActions.voucherFailure({ data: error })))
          );
      })
    ));

  createVoucherSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.createVoucherSuccess),
      switchMap(() => of(VoucherStoreActions.voucherSuccess({ data: new VMSuccess({ message: 'SFRON_SALE_001' }) })))
    ));

  deleteVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.deleteVoucher),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectVoucherForDelete)),
              (initial, voucher) => {
                return [voucher];
              }
            ),
            take(1)
          );
      }),
      switchMap(([voucher]: [Voucher]) => {
        return this.serviceVoucher.delete(voucher.id)
          .pipe(
            map((value: VMDelete) => VoucherStoreActions.deleteVoucherSuccess({ data: value })),
            catchError((error: VMError) => of(VoucherStoreActions.voucherFailure({ data: error })))
          );
      })
    ));

  deleteVoucherSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.deleteVoucherSuccess),
      switchMap(() => of(VoucherStoreActions.voucherSuccess({ data: new VMSuccess({ message: 'EFRON_VOUCH_001' }) })))
    ));

  updateVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.updateVoucher),
      map((action: { newVoucher: IVoucherCreateRequestOrEdit }) => action.newVoucher),
      switchMap((query: IVoucherCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectVoucherForEdit)),
              (initial, voucher) => {
                return [query, voucher];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, voucher]: [IVoucherCreateRequestOrEdit, Voucher]) => {
        return this.serviceVoucher.update(voucher.id, query)
          .pipe(
            map((value: Voucher) => VoucherStoreActions.updateVoucherSuccess({ voucher: value })),
            catchError((error: VMError) => of(VoucherStoreActions.voucherFailure({ data: error })))
          );
      })
    ));

  updateVoucherSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.updateVoucherSuccess),
      switchMap(() => of(VoucherStoreActions.voucherSuccess({ data: new VMSuccess({ message: 'SFRON_UAPP_003' }) })))
    ));

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.modalEditClose)
    ), { dispatch: false });

  alertDeleteOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.alertDeleteOpen)
    ), { dispatch: false });

  alertDeleteCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.alertDeleteClose)
    ), { dispatch: false });

  voucherFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.voucherFailure),
      switchMap(() => of(VoucherStoreActions.errorToNull()))
    ));

  voucherSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.voucherSuccess),
      switchMap(() => of(VoucherStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.successToNull)
    ), { dispatch: false });

  clearVoucherEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(VoucherStoreActions.clearVoucher)
    ), { dispatch: false });

}
