import { IOcuppation } from '@shared/models/ocuppation/ocuppation.interface';
import { IDocument } from '../document-type/document-type.interface';

export interface IUserEstablishment {
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
  birthDate: string;
  address: string;
  source: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  documents: IDocument;
  documentTypeId?: number;
  document?: string;
  color: string;
  ocuppations: Array<IOcuppation>;
}

export interface IUserEstablishmentCreateRequestOrEdit {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  urlPhoto: string;
  birthDate: string;
  address: string;
  source?: string;
  status: number;
  documentTypeId: number;
  document: string;
  color: string;
  ocuppationsId: Array<number>;
}

export interface IUserEstablishmentAddRequest {
  id: number;
  color: string;
  ocuppationsId: Array<number>;
}

export interface IUserEstablishmentWithPagination {
  data: Array<IUserEstablishment>;
  page: number;
  perPage: number;
  totalRecords: number;
}
