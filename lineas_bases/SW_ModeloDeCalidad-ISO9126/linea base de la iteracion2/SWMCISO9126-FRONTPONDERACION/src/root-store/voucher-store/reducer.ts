import { Action, createReducer, on } from '@ngrx/store';
import { Voucher } from '@shared/models/voucher/voucher.class';
import * as VoucherStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(VoucherStoreActions.getVouchers, (state: State, { query }) => ({
    ...state,
    isLoadingGetVouchers: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(VoucherStoreActions.getVouchersSuccess, (state: State, { vouchers }) => ({
    ...state,
    isLoadingGetVouchers: false,
    isLoadingGeneral: false,
    currentPage: vouchers.page,
    itemsPerPage: vouchers.perPage,
    totalRecords: vouchers.totalRecords,
    vouchers: vouchers.data
  })),
  on(VoucherStoreActions.createVoucher, (state: State) => ({
    ...state,
    isLoadingCreateVoucher: true,
    isLoadingGeneral: true
  })),
  on(VoucherStoreActions.createVoucherSuccess, (state: State) => ({
    ...state,
    isLoadingCreateVoucher: false,
    isLoadingGeneral: false
  })),
  on(VoucherStoreActions.deleteVoucher, (state: State) => ({
    ...state,
    isLoadingDeleteVoucher: true,
    isLoadingGeneral: true
  })),
  on(VoucherStoreActions.deleteVoucherSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteVoucher: false,
    isLoadingGeneral: false
  })),
  on(VoucherStoreActions.updateVoucher, (state: State) => ({
    ...state,
    isLoadingUpdateVoucher: true,
    isLoadingGeneral: true
  })),
  on(VoucherStoreActions.updateVoucherSuccess, (state: State, { voucher }) => {
    let buff = null;
    if (Array.isArray(state.vouchers)) {
      const index = state.vouchers.findIndex((s: Voucher) => s.id === voucher.id);
      buff = [state.vouchers];
      if (index !== -1) {
        buff = [...buff.slice(0, index), voucher, ...buff.slice(index + 1)];
      }

    }

    return {
      ...state,
      vouchers: buff,
      isLoadingUpdateVoucher: false,
      isLoadingGeneral: false
    };
  }),
  on(VoucherStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(VoucherStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(VoucherStoreActions.modalDetailOpen, (state: State, { voucher }) => ({
    ...state,
    modalDetail: true,
    voucherForDetail: voucher
  })),
  on(VoucherStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    voucherForDetail: null
  })),
  on(VoucherStoreActions.modalEditOpen, (state: State, { voucher }) => ({
    ...state,
    modalEdit: true,
    voucherForEdit: voucher
  })),
  on(VoucherStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    voucherForEdit: null
  })),
  on(VoucherStoreActions.alertDeleteOpen, (state: State, { voucher }) => ({
    ...state,
    alertDelete: true,
    voucherForDelete: voucher
  })),
  on(VoucherStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    voucherForDelete: null
  })),
  on(VoucherStoreActions.voucherFailure, (state: State, { data }) => ({
    ...state,
    isLoadingGetVouchers: false,
    isLoadingCreateVoucher: false,
    isLoadingUpdateVoucher: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(VoucherStoreActions.voucherSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(VoucherStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(VoucherStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(VoucherStoreActions.clearVoucher, (state: State) => ({
    vouchers: null,
    itemsPerPage: null,
    currentPage: null,
    totalRecords: null,
    query: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    alertDelete: false,
    voucherForDetail: null,
    voucherForDelete: null,
    voucherForEdit: null,
    error: null,
    success: null,
    isLoadingGetVouchers: false,
    isLoadingCreateVoucher: false,
    isLoadingDeleteVoucher: false,
    isLoadingUpdateVoucher: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function voucherReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
