export class VoucherEndpoint {
  static createByEstablishment = 'local-establishment/{localEstablishmentId}/user-app/{userAppId}/voucher';
  static getByEstablishment = 'local-establishment/{localEstablishmentId}/voucher';
  static update = 'voucher/{voucherId}';
  static delete = 'voucher/{voucherId}';
}
