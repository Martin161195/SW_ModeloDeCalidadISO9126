import { TypeOfApplication } from '../type-of-application/type-of-application.class';
import { ITypeOfApplication, ITypeOfApplicationEditRequest } from '../type-of-application/type-of-application.interface';

export interface ILocalEstablishmentInformationForm {
  name: string;
  username: string;
  cellPhone: string;
  phone: string;
  description: string;
  imageProfile: string;
  images: Array<string>;
  latitude: number;
  longitude: number;
  contactEmail: string;
  address: string;
}

export interface ILocalEstablishmentStatusForm {
  enabledMultisede: number;
  visible: number;
  status: number;
  applications: Array<TypeOfApplication>;
}

export interface ILocalEstablishment {
  id: number;
  address: string;
  name: string;
  username: string;
  cellPhone: string;
  phone: string;
  description: string;
  imageProfile: string;
  images: Array<string>;
  latitude: number;
  longitude: number;
  enabledMultisede: number;
  contactEmail: string;
  status: number;
  visible: number;
  localId: number;
  countryCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILocalEstablishmentResponse {
  generalInformation: ILocalEstablishment;
  applications: Array<ITypeOfApplication>;
}

export interface ILocalEstablishmentsByUserRequest {
  userLocalId: number;
}

export interface ILocalEstablishmentCreateRequest {
  name: string;
  localId: number;
  countryCode: string;
  images: Array<string>;
}

export interface IEstablishmentStatusEditRequest {
  status: number;
  visible: number;
  enabledMultisede: number;
  applications: Array<ITypeOfApplicationEditRequest>;
}
