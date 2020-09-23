import { FileItem } from '@core/lib/components/images/drop-zone/file-item.class';

export abstract class BaseImageClass {
  files: Array<FileItem>;
  images: Array<string>;
  validImages: boolean;
  constructor() {
    this.files = [];
    this.images = [];
    this.validImages = true;
  }

  fileUpload($event: Array<FileItem>): void {
    this.files = $event;
  }

  imagesCurrent($event: Array<string>): void {
    this.images = [...$event];
  }

}
