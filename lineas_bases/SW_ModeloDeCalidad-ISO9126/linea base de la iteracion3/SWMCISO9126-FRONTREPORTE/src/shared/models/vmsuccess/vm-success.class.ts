export class VMSuccess {
  message: string;
  constructor(obj?: any) {
    this.message = obj && obj.message || null;
  }
}
