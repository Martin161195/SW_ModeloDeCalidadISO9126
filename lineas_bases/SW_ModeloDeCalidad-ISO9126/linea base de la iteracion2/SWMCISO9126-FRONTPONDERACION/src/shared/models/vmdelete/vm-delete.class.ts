import { IVMDeleteInterface } from './vm-delete.interface';

export class VMDelete {
  rows: number;
  constructor(obj?: IVMDeleteInterface) {
    this.rows = obj && obj.rows || null;
  }
}
