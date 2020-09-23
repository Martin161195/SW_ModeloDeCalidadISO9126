import { TypeOfApplication } from '../type-of-application/type-of-application.class';
import { ITypeOfApplication, ITypeOfApplicationEditRequest } from '../type-of-application/type-of-application.interface';

export interface ILocalInformationForm {
  name: string;
  username: string;
  description: string;
  imageProfile: string;
  images: Array<string>;
  email: string;
  cellPhone: string;
  phone: string;
}

export interface ILocalStatusForm {
  enabledMultisede: number;
  visible: number;
  status: number;
  applications: Array<TypeOfApplication>;
}

export interface ILocalBusinessForm {
  businessName: string;
  rucNumber: string;
  address: string;
  firstNameLegal: string;
  lastNameLegal: string;
  emailLegal: string;
}

export interface ILocalGeneralInformation {
  id: number;
  name: string;
  username: string;
  description: string;
  imageProfile: string;
  images: Array<string>;
  email: string;
  cellPhone: string;
  phone: string;
  enabledMultisede: number;
  visible: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ILocalGeneralInformationEditRequest {
  name: string;
  username: string;
  description: string;
  imageProfile: string;
  images: Array<string>;
  email: string;
  cellPhone: string;
  phone: string;
}

export interface ILocalBusinessInformation {
  businessName: string;
  rucNumber: string;
  address: string;
  firstNameLegal: string;
  lastNameLegal: string;
  emailLegal: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  localId: number;
}

export interface ILocalResponse {
  generalInformation: ILocalGeneralInformation;
  businessInformation: ILocalBusinessInformation;
  applications: Array<ITypeOfApplication>;
}

export interface ILocalStatusEditRequest {
  status: number;
  visible: number;
  enabledMultisede: number;
  applications: Array<ITypeOfApplicationEditRequest>;
}
