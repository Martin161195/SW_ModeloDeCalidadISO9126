export class UserAppEndpoint {
  static getByDocument = 'user-app/document-type/{documentTypeId}/document/{document}';
  static getByEmail = 'user-app/email/{email}';
  static getPromotionByCode = 'user-app/{userAppId}/local-establishment/{localEstablishmentId}/promotion/{codePromotion}';
  static existByDocument = 'user-app/document-type/{documentTypeId}/document/{document}/exist';
}
