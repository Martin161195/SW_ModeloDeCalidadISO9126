import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { coerceStringProp } from '@core/common/helpers';
import { FileItem } from './file-item.class';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-drop-perfil',
  templateUrl: './vm-drop-perfil.component.html'
})

export class VMDropPerfilComponent implements OnInit {

  private _otherClass = [];
  @Input()
  get otherClass(): Array<string> {
    return this._otherClass;
  }
  set otherClass(value: Array<string>) {
    this._otherClass = Array.isArray(value) ? value : [];
  }

  /**
   * @description
   * Disabled change page
   */
  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  /**
   * @description
   * Disabled change page
   */
  private _image = '';
  @Input()
  get image(): string {
    return this._image;
  }
  set image(value: string) {
    this._image = coerceStringProp(value) ? value : '';
  }

  /**
   * @description
   * Disabled change page
   */
  private _file: FileItem;
  @Input()
  get file(): FileItem {
    return this._file;
  }
  set file(value: FileItem) {
    this._file = value;
  }

  @Output() readonly fileUpload: EventEmitter<FileItem>;
  enterBox: boolean;
  constructor() {
    this.enterBox = false;
    this.fileUpload = new EventEmitter<FileItem>();
  }

  ngOnInit(): void { }

  enter($event: boolean): void {
    this.enterBox = $event;
  }

  getImages($event: Array<FileItem>): void {
    if (!this.disabled) {
      this.setFile($event[0]);
      this.fileUpload.emit(this.getFile());
    }
  }

  private getFile(): FileItem {
    return this.file;
  }

  private setFile(file: FileItem): void {
    this.file = file;
  }

}
