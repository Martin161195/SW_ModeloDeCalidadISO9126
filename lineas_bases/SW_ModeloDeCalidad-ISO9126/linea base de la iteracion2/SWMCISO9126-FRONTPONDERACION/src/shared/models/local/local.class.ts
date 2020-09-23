import { TypeOfApplication } from '../type-of-application/type-of-application.class';
import { ITypeOfApplication } from '../type-of-application/type-of-application.interface';
import { ILocalBusinessInformation, ILocalGeneralInformation, ILocalResponse } from './local.interface';

export class LocalGeneralInformation {
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
  createdAt: Date;
  updatedAt: Date;
  // tslint:disable-next-line: cyclomatic-complexity
  constructor(obj?: ILocalGeneralInformation) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.description = obj && obj.description || null;
    this.imageProfile = obj && obj.imageProfile || null;
    this.images = obj && obj.images || null;
    this.email = obj && obj.email || null;
    this.cellPhone = obj && obj.cellPhone || null;
    this.phone = obj && obj.phone || null;
    this.enabledMultisede = obj && obj.enabledMultisede || null;
    this.visible = obj && obj.visible || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
  }
}

export class LocalBusinessInformation {
  businessName: string;
  rucNumber: string;
  address: string;
  firstNameLegal: string;
  lastNameLegal: string;
  emailLegal: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  localId: number;
  // tslint:disable-next-line: cyclomatic-complexity
  constructor(obj?: ILocalBusinessInformation) {
    this.businessName = obj && obj.businessName || null;
    this.rucNumber = obj && obj.rucNumber || null;
    this.address = obj && obj.address || null;
    this.firstNameLegal = obj && obj.firstNameLegal || null;
    this.lastNameLegal = obj && obj.lastNameLegal || null;
    this.emailLegal = obj && obj.emailLegal || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.localId = obj && obj.localId || null;
  }
}

export class LocalResponse {
  generalInformation: LocalGeneralInformation;
  businessInformation: LocalBusinessInformation;
  applications: Array<TypeOfApplication>;
  constructor(obj?: ILocalResponse) {
    this.generalInformation = obj && obj.generalInformation && new LocalGeneralInformation(obj.generalInformation) || null;
    this.businessInformation = obj && obj.businessInformation && new LocalBusinessInformation(obj.businessInformation) || null;
    this.applications = obj && obj.applications && obj.applications.map((ap: ITypeOfApplication) => new TypeOfApplication(ap)) || [];
  }
}
