export class UserLocal {
  id: number;
  email: string;
  phone: string;
  emailVerified: number;
  phoneVerified: number;
  status: number;
  dateRegister: Date;
  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.email = obj && obj.email || null;
    this.phone = obj && obj.phone || null;
    this.emailVerified = obj && obj.emailVerified || null;
    this.phoneVerified = obj && obj.phoneVerified || null;
    this.status = obj && obj.status || null;
    this.dateRegister = obj && obj.dateRegister && new Date(obj.dateRegister) || null;
  }
}
