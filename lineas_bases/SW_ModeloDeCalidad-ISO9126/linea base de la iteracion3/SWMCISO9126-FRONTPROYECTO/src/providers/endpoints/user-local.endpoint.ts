export class UserLocalEndpoint {
  static login = 'apiLoginSWMCISO';
  static signin = 'apiLoginSWMCISO/registrar';
  static ponderacion = 'apiAnalisisSWMCISO/ponderacion';
  static resultado = 'apiAnalisisSWMCISO/resultado';

  static verifyEmail = 'authentication/verify-email';
  static getByLocal = 'user-local';
  static createByLocal = 'user-local';
  static getById = 'user-local/{id}';
  static update = 'user-local/{userLocalId}';
  static getEstablishments = 'user-local/{userLocalId}/local-establishment';
  static delete = 'user-local/{userLocalId}';
}
