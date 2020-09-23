import { Appointment } from '../appointment/appointment.class';
import { IAppointment } from '../appointment/appointment.interface';
import { IProductVoucher } from '../product/product.interface';
import { UserApp } from '../user-app/user-app.class';
import { IVoucher, IVoucherWithPagination } from './voucher.interface';

export class Voucher {
  id: number;
  voucherNumber: number;
  total: number;
  discount: number;
  promotion: any;
  localId: number;
  localEstablishmentId: number;
  userAppId: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  detailPayment: any;
  userApp: UserApp;
  appointments: Array<Appointment>;
  products: Array<IProductVoucher>;
  localEstablishment: any;
  client: string;
  showTotal: string;
  showDiscount: string;
  // tslint:disable-next-line: cyclomatic-complexity
  constructor(obj?: IVoucher) {
    this.id = obj && obj.id || null;
    this.total = obj && obj.total || null;
    this.voucherNumber = obj && obj.voucherNumber || null;
    this.discount = obj && obj.discount || null;
    this.promotion = obj && obj.promotion || null;
    this.localId = obj && obj.localId || null;
    this.localEstablishmentId = obj && obj.localEstablishmentId || null;
    this.userAppId = obj && obj.userAppId || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.detailPayment = obj && obj.detailPayment || null;
    this.userApp = obj && obj.userApp && new UserApp(obj.userApp) || null;
    this.appointments = obj && obj.appointments && obj.appointments
      .map((obj1: IAppointment) => new Appointment(obj1)) || null;
    this.products = obj && obj.products || null;
    this.localEstablishment = obj && obj.localEstablishment || null;
    if (this.userApp) { this.client = this.userApp.fullName; }
    this.showTotal = (this.total === null || this.total === 0)
      ? 'Servicio Gratuito' : `S/ ${this.total.toFixed(2)}`;
    this.showDiscount = (this.discount === null || this.discount === 0)
      ? 'Sin Descuento' : `S/ ${this.discount.toFixed(2)}`;
  }
}

export class VoucherWithPagination {
  data: Array<Voucher>;
  page: number;
  perPage: number;
  totalRecords: number;
  constructor(obj?: IVoucherWithPagination) {
    this.data = obj && obj.data && obj.data.map((obj1: IVoucher) => new Voucher(obj1)) || null;
    this.page = obj && obj.page || null;
    this.perPage = obj && obj.perPage || null;
    this.totalRecords = obj && obj.totalRecords || null;
  }
}
