import { IAppointment } from '../appointment/appointment.interface';
import { IProductVoucher } from '../product/product.interface';
import { IUserApp } from '../user-app/user-app.interface';

export interface IVoucher {
  id: number;
  voucherNumber: number;
  total: number;
  discount: number;
  promotion: any;
  localId: number;
  localEstablishmentId: number;
  userAppId: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  detailPayment: any;
  userApp: IUserApp;
  appointments: Array<IAppointment>;
  products: Array<IProductVoucher>;
  localEstablishment: any;
}

export interface IVoucherCreateRequest {
  detailPayment: any;
  voucher: any;
  appointments: any;
  products: any;
}
export interface IVoucherCreateRequestOrEdit {
  id: number;
  name: string;
}

export interface IVoucherWithPagination {
  data: Array<IVoucher>;
  page: number;
  perPage: number;
  totalRecords: number;
}
