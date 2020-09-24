export class VMError {
  error: string;
  message: string;
  status: number;
  constructor(obj?: any) {
    this.error = obj && obj.error || null;
    this.message = obj && obj.message || null;
    this.status = obj && obj.status || null;
  }
}
