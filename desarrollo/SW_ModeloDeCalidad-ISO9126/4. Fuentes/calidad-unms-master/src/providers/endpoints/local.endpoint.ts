export class LocalEndpoint {
  static get = 'local';
  static create = 'local';
  static getById = 'local/{id}';
  static getBySearch = 'local/search';
  static update = 'local/{id}';

  static getInformation = 'local/information';
  static updateInformation = 'local/information';
  static updateStatus = 'local/status';
  static updateBusiness = 'local/business';
  static getPlan = 'local/plan';
  static updatePlan = 'local/plan';
}
