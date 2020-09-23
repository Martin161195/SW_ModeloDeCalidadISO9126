export class AppointmentEndpoint {
  static create = 'local-establishment/{localEstablishmentId}/user-app/{userAppId}/appointment';
  static createMany = 'local-establishment/{localEstablishmentId}/appointment/many';

  static getByEstablishment = 'local-establishment/{localEstablishmentId}/appointment';
  // tslint:disable-next-line: max-line-length
  static getByUserAppNotVoucher = 'user-app/{userAppId}/local-establishment/{localEstablishmentId}/appointment/no-voucher';

  static update = 'appointment/{appointmentId}';
  static delete = 'appointment/{appointmentId}';
}
