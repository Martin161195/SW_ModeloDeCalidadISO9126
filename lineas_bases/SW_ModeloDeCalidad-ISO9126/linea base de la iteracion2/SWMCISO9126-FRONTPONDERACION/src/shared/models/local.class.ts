export class Local {
  id: number;
  name: string;
  username: string;
  address: string;
  phone: Array<string>;
  description: string;
  images: Array<string>;
  latitude: number;
  longitude: number;
  status: number;
  visible: number;
  dateRegister: Date;
  userLocalId: number;
  // tslint:disable-next-line:cyclomatic-complexity
  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.address = obj && obj.address || null;
    this.phone = obj && obj.phone || null;
    this.description = obj && obj.description || null;
    this.images = obj && obj.images || null;
    this.latitude = obj && obj.latitude || null;
    this.longitude = obj && obj.longitude || null;
    this.status = obj && obj.status || null;
    this.visible = obj && obj.visible || null;
    this.dateRegister = obj && obj.dateRegister && new Date(obj.dateRegister) || null;
    this.userLocalId = obj && obj.userLocalId || null;
  }
}
