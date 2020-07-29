import { convert, IUnity } from '@shared/helpers/functions/size-file';
export class FileItem {
  file: File;
  name: string;
  url: string;
  unit: IUnity;
  constructor(obj?: any) {
    this.file = obj && obj.file;
    this.name = obj && obj.file.name;
    this.url = obj && obj.url;
    this.unit = convert(this.file.size);
  }
}
