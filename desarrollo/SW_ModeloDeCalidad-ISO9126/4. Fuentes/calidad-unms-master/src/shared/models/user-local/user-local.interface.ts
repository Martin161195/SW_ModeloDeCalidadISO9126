
export interface IEstablishmentAndRole {
  localEstablishmentId: number;
  localRoleId: number;
}

export interface IUserLocal {
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
  createdAt: string;
  updatedAt: string;
  establishments: Array<IEstablishmentAndRole>;
}

export interface IUserLocalLoginRequest {
  user: string;
  password: string;
}

export interface IAuthUserLocalLoginResponse {
  token: string;
  user: IUserLocal;
}

export interface IUserLocalSigninRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    owner: number;
  };
  local: {
    name: string;
    username: string;
    images: Array<string>;
  };
  countryCode: string;
}

export interface IUserLocalCreateRequestOrEdit {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status ?: number;
  establishments: Array<IEstablishmentAndRole>;
}
