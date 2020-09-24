import { GetDateFromYYYYMMDDString } from '@shared/helpers/functions/date';
import { Ocuppation } from '@shared/models/ocuppation/ocuppation.class';
import { Document } from '../document-type/document-type.class';
import { IOcuppation } from '../ocuppation/ocuppation.interface';
import { IUserEstablishment, IUserEstablishmentWithPagination } from './user-establishment.interface';

export class UserEstablishment {
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
  birthDate: Date;
  address: string;
  source: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  documents: Document;
  documentTypeId: number;
  document: string;
  color: string;
  ocuppations: Array<Ocuppation>;
  statusUserEstablishment: string;
  genderString: string;
  phoneString: string;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IUserEstablishment) {
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
    this.birthDate = obj && obj.birthDate && GetDateFromYYYYMMDDString(obj.birthDate, '-') || null;
    this.address = obj && obj.address || null;
    this.source = obj && obj.source || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.documents = obj && obj.documents && new Document(obj.documents) || null;
    this.documentTypeId = obj && obj.documentTypeId || null;
    this.document = obj && obj.document || null;
    this.color = obj && obj.color || null;
    this.ocuppations = obj && obj.ocuppations && obj.ocuppations.map((o: IOcuppation) => new Ocuppation(o)) || [];
    this.statusUserEstablishment = (this.status === 1) ? 'Activo' : `Inactivo`;
    this.genderString = (this.gender === 'M') ? 'Masculino' : `Femenino`;
    this.phoneString = !!this.phone ? this.phone : `No Registrado`;
  }
}

export class UserEstablishmentWithPagination {
  data: Array<UserEstablishment>;
  page: number;
  perPage: number;
  totalRecords: number;
  constructor(obj?: IUserEstablishmentWithPagination) {
    this.data = obj && obj.data && obj.data.map((obj1: IUserEstablishment) => new UserEstablishment(obj1)) || null;
    this.page = obj && obj.page || null;
    this.perPage = obj && obj.perPage || null;
    this.totalRecords = obj && obj.totalRecords || null;
  }
}
