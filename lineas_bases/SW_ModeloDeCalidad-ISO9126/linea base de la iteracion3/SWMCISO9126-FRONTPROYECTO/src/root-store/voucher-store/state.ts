import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Voucher } from '@shared/models/voucher/voucher.class';

// tslint:disable-next-line: interface-name
export interface State {
  // vouchers retrieve from server
  vouchers: Array<Voucher> | null;
  // number of vouchers for view in table
  itemsPerPage: number | null;
  // currentPage
  currentPage: number | null;
  // currentPage
  totalRecords: number | null;
  // order
  query: IPagination | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model edit: open -> true, close -> false
  modalEdit: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // State for voucher edit
  voucherForEdit: Voucher | null;
  // State for voucher detail
  voucherForDetail: Voucher | null;
  // State for voucher delete
  voucherForDelete: Voucher | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Vouchers App
  isLoadingGetVouchers: boolean;
  // load while send request for Create Voucher
  isLoadingCreateVoucher: boolean;
  // load while send request for Update Voucher
  isLoadingUpdateVoucher: boolean;
  // load while send request for Delete Voucher
  isLoadingDeleteVoucher: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
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
  voucherForEdit: null,
  voucherForDelete: null,
  error: null,
  success: null,
  isLoadingGetVouchers: false,
  isLoadingCreateVoucher: false,
  isLoadingUpdateVoucher: false,
  isLoadingDeleteVoucher: false,
  isLoadingGeneral: false
};
