import { IVMAlertInterface } from './vm-alert.interface';

export class VMAlert {
  icon: Array<string>;
  title: string;
  description: string;
  textCancelButton: string;
  textSuccessButton: string;
  data: any;
  constructor(obj?: IVMAlertInterface) {
    this.icon = obj && obj.icon || null;
    this.title = obj && obj.title || null;
    this.description = obj && obj.description || null;
    this.textCancelButton = obj && obj.textCancelButton || null;
    this.textSuccessButton = obj && obj.textSuccessButton || null;
    this.data = obj && obj.data || null;
  }
}
