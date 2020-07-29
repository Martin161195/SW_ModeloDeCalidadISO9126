import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { FileItem } from './file-item.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[VMDropFiles]'
})
export class VMDropFilesDirective {
  @Output() readonly enter: EventEmitter<boolean>;
  @Output() readonly fileUpload: EventEmitter<Array<FileItem>>;

  constructor(
    public element: ElementRef
  ) {
    this.enter = new EventEmitter<boolean>();
    this.fileUpload = new EventEmitter<Array<FileItem>>();
  }

  @HostListener('dragenter', ['$event']) public onDragEnter(): void {
    this.enter.emit(true);
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(): void {
    this.enter.emit(false);
  }

  @HostListener('dragover', ['$event']) public onDragOver(event: any): void {
    this.enter.emit(true);
    this.preventEvent(event);
  }

  @HostListener('drop', ['$event']) public onDrop(event: any): void {
    const transferencia = this.getTransferencia(event);
    if (!transferencia) { return; }
    this.addFiles(transferencia.files);
    this.enter.emit(false);
    this.preventEvent(event);
  }

  @HostListener('change', ['$event']) public onchange(event: any): void {
    if (!event.target.files) { return; }
    this.addFiles(event.target.files);
    this.enter.emit(false);
    this.preventEvent(event);
  }

  getFiles(obj: Array<any>): Array<FileItem> {
    const files = [];
    obj.forEach((item: any) => {
      files.push(new FileItem(item));
    });

    return [...files];
  }

  protected addFiles(files: FileList): void {
    const promises = [];
    for (const property of Object.getOwnPropertyNames(files)) {
      const temp = files[property];
      if (this.fileEnabledUpload(temp)) {
        promises.push(this.getFile64(temp));
      }
    }
    Promise.all(promises)
      .then((result: Array<any>) => {
        const images = this.getFiles(result);
        this.fileUpload.emit(images);
      });

  }

  protected fileEnabledUpload(file: File): boolean {
    return this.isImage(file.type);
  }

  protected isImage(file: string): boolean {
    return (file === '' || file === undefined) ? false : file.startsWith('image');
  }

  protected getFile64(file: File): any {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        /* resolve(reader.result); */
        resolve({
          file,
          url: reader.result
        });
      };
      reader.readAsDataURL(file);
    });
  }

  protected preventEvent(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  protected getTransferencia(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

}
