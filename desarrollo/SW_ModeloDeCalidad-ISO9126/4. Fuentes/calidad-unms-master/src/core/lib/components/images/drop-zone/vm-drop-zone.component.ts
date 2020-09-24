import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';
import { FileItem } from './file-item.class';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-drop-zone',
  templateUrl: './vm-drop-zone.component.html'
})

export class VMDropZoneComponent implements OnInit {
  enterBox: boolean;

  /**
   * @description
   * Input para disabled el input nativo
   */
  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProp(value);
  }

  /**
   * @description
   * icon sostiene al icono del card, si no es seteado no aparecera
   */
  private _files = [];
  @Input()
  get files(): Array<FileItem> {
    return this._files;
  }
  set files(value: Array<FileItem>) {
    this._files = Array.isArray(value) ? value : [];
  }

  @Output() readonly fileUpload: EventEmitter<Array<FileItem>>;
  constructor() {
    this.enterBox = false;
    this.fileUpload = new EventEmitter<Array<FileItem>>();
  }

  ngOnInit(): void {
    if (!this.files) { this.setFiles([]); }
  }

  enter($event: boolean): void {
    this.enterBox = $event;
  }

  getImages($event: Array<FileItem>): void {
    const buffFiles = [];
    $event.forEach((item: FileItem) => {
      if (!this.fileIsUpload(item)) {
        buffFiles.push(item);
      }
    });
    this.addFiles(buffFiles);
    this.fileUpload.emit(this.getFiles());
  }

  fileIsUpload(fileItem: FileItem): boolean {
    const files = this.getFiles();
    let buff = false;
    for (const file of files) {
      if (file.name === fileItem.name) {
        buff = true;
        break;
      }
    }

    return buff;
  }

  getFiles(): Array<FileItem> {
    return [...this.files];
  }

  removeFile(index: number): void {
    this.deleteFileByIndex(index);
    this.fileUpload.emit(this.getFiles());
  }

  private addFile(obj: any): void {
    const files = this.getFiles();
    this.files = [...files, new FileItem({ ...obj })];
  }

  private addFiles(arr: Array<FileItem>): void {
    const files = this.getFiles();
    this.files = [...files, ...arr];
  }

  private setFiles(arr: Array<FileItem>): void {
    this.files = [...arr];
  }

  private deleteFileByIndex(index: number): void {
    const files = this.getFiles();
    const newFiles = [...files.slice(0, index), ...files.slice(index + 1)];
    this.setFiles(newFiles);
  }

  trackByFn(index, item): number {
    return item;
  }

}
