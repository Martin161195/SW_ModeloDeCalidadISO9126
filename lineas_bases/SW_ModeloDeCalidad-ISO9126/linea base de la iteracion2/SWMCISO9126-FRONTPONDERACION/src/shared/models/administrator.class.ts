export class Administrator {
  id: number;
  email: string;
  status: number;
  dateRegister: Date;
  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.email = obj && obj.email || null;
    this.status = obj && obj.status || null;
    this.dateRegister = obj && obj.dateRegister && new Date(obj.dateRegister) || null;
  }
}

export class AuthAdministrator {
  token: string;
  admin: Administrator;
  constructor(obj: any) {
    this.token = obj && obj.token || null;
    this.admin = obj && obj.administrator && new Administrator(obj.administrator) || null;
  }
}
