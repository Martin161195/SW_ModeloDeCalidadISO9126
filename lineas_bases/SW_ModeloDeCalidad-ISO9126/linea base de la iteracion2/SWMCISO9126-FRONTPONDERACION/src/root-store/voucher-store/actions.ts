import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createAction, props } from '@ngrx/store';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { Voucher, VoucherWithPagination } from '@shared/models/voucher/voucher.class';
import { IVoucherCreateRequest, IVoucherCreateRequestOrEdit } from '@shared/models/voucher/voucher.interface';

export enum ActionTypes {
  GETVOUCHERS = '[VOUCHER] Get Vouchers',
  GETVOUCHERSSUCCESS = '[VOUCHER] Get Vouchers Success',
  CREATEVOUCHER = '[VOUCHER] Create Voucher',
  CREATEVOUCHERSUCCESS = '[VOUCHER] Create Voucher Success',
  UPDATEVOUCHER = '[VOUCHER] Update Voucher',
  UPDATEVOUCHERSUCCESS = '[VOUCHER] Update Voucher Success',
  DELETEVOUCHER = '[VOUCHER] Delete Voucher',
  DELETEVOUCHERSUCCESS = '[VOUCHER] Delete Voucher Success',
  // Events for modal
  MODALCREATEOPEN = '[VOUCHER] Modal Create Open',
  MODALCREATECLOSE = '[VOUCHER] Modal Create Close',
  MODALDETAILOPEN = '[VOUCHER] Modal Detail Open',
  MODALDETAILCLOSE = '[VOUCHER] Modal Detail Close',
  MODALEDITOPEN = '[VOUCHER] Modal Edit Open',
  MODALEDITCLOSE = '[VOUCHER] Modal Edit Close',
  ALERTDELETEOPEN = '[VOUCHER] Alert Delete Open',
  ALERTDELETECLOSE = '[VOUCHER] Alert Delete Close',
  // Error global Voucher
  VOUCHERSUCCESS = '[VOUCHER] Voucher Success',
  VOUCHERFAILURE = '[VOUCHER] Voucher Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[VOUCHER] Error To Null',
  SUCCESSTONULL = '[VOUCHER] Success To Null',
  // Clear state
  CLEARVOUCHER = '[VOUCHER] Clear Voucher'
}

export const getVouchers = createAction(
  ActionTypes.GETVOUCHERS,
  props<{ query: IPagination }>()
);

export const getVouchersSuccess = createAction(
  ActionTypes.GETVOUCHERSSUCCESS,
  props<{ vouchers: VoucherWithPagination }>()
);

export const createVoucher = createAction(
  ActionTypes.CREATEVOUCHER,
  props<{ data: { data: IVoucherCreateRequest, userAppId: number } }>()
);

export const createVoucherSuccess = createAction(
  ActionTypes.CREATEVOUCHERSUCCESS,
  props<{ voucher: IVoucherCreateRequest }>()
);

export const deleteVoucher = createAction(
  ActionTypes.DELETEVOUCHER
);

export const deleteVoucherSuccess = createAction(
  ActionTypes.DELETEVOUCHERSUCCESS,
  props<{ data: VMDelete }>()
);

export const updateVoucher = createAction(
  ActionTypes.UPDATEVOUCHER,
  props<{ newVoucher: IVoucherCreateRequestOrEdit }>()
);

export const updateVoucherSuccess = createAction(
  ActionTypes.UPDATEVOUCHERSUCCESS,
  props<{ voucher: Voucher }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ voucher: Voucher }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ voucher: Voucher }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ voucher: Voucher }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const voucherSuccess = createAction(
  ActionTypes.VOUCHERSUCCESS,
  props<{ data: VMSuccess }>()
);

export const voucherFailure = createAction(
  ActionTypes.VOUCHERFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearVoucher = createAction(
  ActionTypes.CLEARVOUCHER
);
