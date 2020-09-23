export class LocalEstablishmentEndpoint {
  static create = 'local-establishment';
  static createPromotion = 'local-establishment/{localEstablishmentId}/promotion';
  static createService = 'local-establishment/{localEstablishmentId}/service';
  static createUserApp = 'local-establishment/{localEstablishmentId}/user-app';
  static createUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment';
  static addUserApp = 'local-establishment/{localEstablishmentId}/user-app/{userAppId}';
  static addUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment/{userEstablishmentId}';

  static getCategories = 'local-establishment/{localEstablishmentId}/category';
  static getCurrencies = 'local-establishment/{localEstablishmentId}/currency';
  static getCurrencyBase = 'local-establishment/{localEstablishmentId}/currency/base';
  static getInformation = 'local-establishment/{localEstablishmentId}/information';
  static getPaymentMethods = 'local-establishment/{localEstablishmentId}/payment-method';
  static getPromotions = 'local-establishment/{localEstablishmentId}/promotion';
  static getPromotionsByCode = 'local-establishment/{localEstablishmentId}/promotion/code/{code}';
  static getServices = 'local-establishment/{localEstablishmentId}/service';
  static getStatusAppointments = 'local-establishment/{localEstablishmentId}/status-appointment';
  static getUsersApp = 'local-establishment/{localEstablishmentId}/user-app';
  static getUserAppByEmail = 'local-establishment/{localEstablishmentId}/user-app/email/{email}/one';
  static getUsersAppByEmail = 'local-establishment/{localEstablishmentId}/user-app/email/{email}';
  static getUsersAppByEmailOrNames = 'local-establishment/{localEstablishmentId}/user-app/email-or-names/{search}';
  static getUsersEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment';
  static getUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment/{userEstablishmentId}';
  // tslint:disable-next-line: max-line-length
  static getSchedulesUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment/{userEstablishmentId}/user-establishment-schedule';

  static updateCategories = 'local-establishment/{localEstablishmentId}/category';
  static updateCurrencies = 'local-establishment/{localEstablishmentId}/currency';
  static updateCurrencyBase = 'local-establishment/{localEstablishmentId}/currency/{currencyId}/base';
  static updateEstablishmentInformation = 'local-establishment/{localEstablishmentId}/information';
  static updateEstablishmentStatus = 'local-establishment/{localEstablishmentId}/status';
  static updatePaymentMethods = 'local-establishment/{localEstablishmentId}/payment-method';
  static updateStatusAppointments = 'local-establishment/{localEstablishmentId}/status-appointment';
  static updateUserApp = 'local-establishment/{localEstablishmentId}/user-app/{userAppId}';
  static updateUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment/{userEstablishmentId}';
  // tslint:disable-next-line: max-line-length
  static updateScheduleUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment/{userEstablishmentId}/user-establishment-schedule/{userEstablishmentScheduleId}';

  static deleteUserApp = 'local-establishment/{localEstablishmentId}/user-app/{userAppId}';
  static deleteUserEstablishment = 'local-establishment/{localEstablishmentId}/user-establishment/{userEstablishmentId}';
}
