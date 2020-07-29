import { GetDateFromYYYYMMDDString } from '@shared/helpers/functions/date';
import { Document } from '../document-type/document-type.class';
import { IUserApp, IUserAppWithPagination } from './user-app.interface';

export class UserApp {
  id: number;
  email: string;
  emailFacebook: string;
  phone: string;
  fullName: string;
  firstName: string;
  lastName: string;
  gender: string;
  urlPhoto: string;
  username: string;
  emailVerified: number;
  phoneVerified: number;
  points: number;
  birthDate: Date;
  address: string;
  source: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  documents: Document;
  documentTypeId: number;
  document: string;
  statusUserApp: string;
  genderString: string;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IUserApp) {
    this.id = obj && obj.id || null;
    this.email = obj && obj.email || null;
    this.emailFacebook = obj && obj.emailFacebook || null;
    this.phone = obj && obj.phone || null;
    this.fullName = obj && obj.fullName || null;
    this.firstName = obj && obj.firstName || null;
    this.lastName = obj && obj.lastName || null;
    this.gender = obj && obj.gender || null;
    this.urlPhoto = obj && obj.urlPhoto || null;
    this.username = obj && obj.username || null;
    this.emailVerified = obj && obj.emailVerified || null;
    this.phoneVerified = obj && obj.phoneVerified || null;
    this.points = obj && obj.points || null;
    this.birthDate = obj && obj.birthDate && GetDateFromYYYYMMDDString(obj.birthDate, '-') || null;
    this.address = obj && obj.address || null;
    this.source = obj && obj.source || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.documents = obj && obj.documents && new Document(obj.documents) || null;
    this.documentTypeId = obj && obj.documentTypeId || null;
    this.document = obj && obj.document || null;
    this.statusUserApp = (this.status === 1) ? 'Activo' : `Inactivo`;
    this.genderString = (this.gender === 'M') ? 'Masculino' : `Femenino`;
  }
}

export class UserAppWithPagination {
  data: Array<UserApp>;
  page: number;
  perPage: number;
  totalRecords: number;
  constructor(obj?: IUserAppWithPagination) {
    this.data = obj && obj.data && obj.data.map((obj1: IUserApp) => new UserApp(obj1)) || null;
    this.page = obj && obj.page || null;
    this.perPage = obj && obj.perPage || null;
    this.totalRecords = obj && obj.totalRecords || null;
  }
}
