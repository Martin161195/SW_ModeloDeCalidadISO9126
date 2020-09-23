import { TypeOfApplication } from '../type-of-application/type-of-application.class';
import { ITypeOfApplication } from '../type-of-application/type-of-application.interface';
import { ILocalEstablishment, ILocalEstablishmentResponse } from './local-establishment.interface';
export class LocalEstablishment {
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
  createdAt: Date;
  updatedAt: Date;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: ILocalEstablishment) {
    this.id = obj && obj.id || null;
    this.address = obj && obj.address || null;
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.cellPhone = obj && obj.cellPhone || null;
    this.phone = obj && obj.phone || null;
    this.description = obj && obj.description || null;
    this.imageProfile = obj && obj.imageProfile || null;
    this.images = obj && obj.images || null;
    this.latitude = obj && obj.latitude || null;
    this.longitude = obj && obj.longitude || null;
    this.enabledMultisede = obj && obj.enabledMultisede || null;
    this.contactEmail = obj && obj.contactEmail || null;
    this.status = obj && obj.status || null;
    this.visible = obj && obj.visible || null;
    this.localId = obj && obj.localId || null;
    this.countryCode = obj && obj.countryCode || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
  }
}

export class LocalEstablishmentResponse {
  generalInformation: LocalEstablishment;
  applications: Array<TypeOfApplication>;
  constructor(obj?: ILocalEstablishmentResponse) {
    this.generalInformation = obj && obj.generalInformation && new LocalEstablishment(obj.generalInformation) || null;
    this.applications = obj && obj.applications && obj.applications.map((ap: ITypeOfApplication) => new TypeOfApplication(ap)) || [];
  }
}
