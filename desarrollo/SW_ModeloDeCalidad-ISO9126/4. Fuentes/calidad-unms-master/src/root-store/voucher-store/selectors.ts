import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Voucher } from '@shared/models/voucher/voucher.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetVouchers = (state: State): boolean => state.isLoadingGetVouchers;

const getIsLoadingCreateVoucher = (state: State): boolean => state.isLoadingCreateVoucher;

const getIsLoadingUpdateVoucher = (state: State): boolean => state.isLoadingUpdateVoucher;

const getIsLoadingDeleteVoucher = (state: State): boolean => state.isLoadingDeleteVoucher;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getVouchers = (state: State): Array<Voucher> | null => state.vouchers;

const getVoucherForDetail = (state: State): Voucher | null => state.voucherForDetail;

const getVoucherForDelete = (state: State): Voucher | null => state.voucherForDelete;

const getVoucherForEdit = (state: State): Voucher | null => state.voucherForEdit;

const getItemsPerPage = (state: State): number | null => state.itemsPerPage;

const getCurrentPage = (state: State): number | null => state.currentPage;

const getTotalRecords = (state: State): number | null => state.totalRecords;

const getQuery = (state: State): IPagination => state.query;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectVoucherState: MemoizedSelector<object, State> = createFeatureSelector<State>('voucher');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectVoucherState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectVoucherState,
  getSuccess
);

export const selectIsLoadingGetVouchers: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getIsLoadingGetVouchers
);

export const selectIsLoadingCreateVoucher: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getIsLoadingCreateVoucher
);

export const selectIsLoadingDeleteVoucher: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getIsLoadingDeleteVoucher
);

export const selectIsLoadingUpdateVoucher: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getIsLoadingUpdateVoucher
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getIsLoadingGeneral
);

export const selectVouchers: MemoizedSelector<object, Array<Voucher> | null> = createSelector(
  selectVoucherState,
  getVouchers
);

export const selectVoucherForDetail: MemoizedSelector<object, Voucher | null> = createSelector(
  selectVoucherState,
  getVoucherForDetail
);

export const selectVoucherForDelete: MemoizedSelector<object, Voucher | null> = createSelector(
  selectVoucherState,
  getVoucherForDelete
);

export const selectVoucherForEdit: MemoizedSelector<object, Voucher | null> = createSelector(
  selectVoucherState,
  getVoucherForEdit
);

export const selectItemsPerPage: MemoizedSelector<object, number | number> = createSelector(
  selectVoucherState,
  getItemsPerPage
);

export const selectCurrentPage: MemoizedSelector<object, number | number> = createSelector(
  selectVoucherState,
  getCurrentPage
);

export const selectTotalRecords: MemoizedSelector<object, number | null> = createSelector(
  selectVoucherState,
  getTotalRecords
);

export const selectQuery: MemoizedSelector<object, IPagination> = createSelector(
  selectVoucherState,
  getQuery
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getModalDetail
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectVoucherState,
  getAlertDelete
);
