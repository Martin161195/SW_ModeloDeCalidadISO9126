import { IAppointment } from '../appointment/appointment.interface';
import { IDocument } from '../document-type/document-type.interface';
export interface IUserApp {
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
  birthDate: string;
  address: string;
  source: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  documents: IDocument;
  documentTypeId?: number;
  document?: string;
}

export interface IUserAppCreateRequestOrEdit {
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
}

export interface IUserAppWithPagination {
  data: Array<IUserApp>;
  page: number;
  perPage: number;
  totalRecords: number;
}

export interface IUserAppointmentHistoryPagination {
  history: Array<IAppointment>;
  page: number;
  perPage: number;
  totalRecords: number;
}
