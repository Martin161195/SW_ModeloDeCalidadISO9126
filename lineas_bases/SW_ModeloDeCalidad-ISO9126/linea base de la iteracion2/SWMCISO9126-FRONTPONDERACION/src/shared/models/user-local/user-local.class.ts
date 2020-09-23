import { IAuthUserLocalLoginResponse, IEstablishmentAndRole, IUserLocal } from './user-local.interface';

export class UserLocal {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: number;
  phoneVerified: number;
  status: number;
  owner: number;
  localId: number;
  createdAt: Date;
  updatedAt: Date;
  establishments: Array<IEstablishmentAndRole>;

  statusUserLocal: string;
  fullName: string;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: IUserLocal) {
    this.id = obj && obj.id || null;
    this.firstName = obj && obj.firstName || null;
    this.lastName = obj && obj.lastName || null;
    this.email = obj && obj.email || null;
    this.phone = obj && obj.phone || null;
    this.emailVerified = obj && obj.emailVerified || null;
    this.phoneVerified = obj && obj.phoneVerified || null;
    this.status = obj && obj.status || null;
    this.owner = obj && obj.owner || null;
    this.localId = obj && obj.localId || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
    this.establishments = obj && obj.establishments || null;
    this.statusUserLocal = (this.status === 1) ? 'Activo' : `Inactivo`;
    this.fullName = `${this.lastName} ${this.firstName}`;
  }
}

export class AuthUserLocal {
  token: string;
  user: UserLocal;
  constructor(obj?: IAuthUserLocalLoginResponse) {
    this.token = obj && obj.token || null;
    this.user = obj && obj.user && new UserLocal(obj.user) || null;
  }
}
