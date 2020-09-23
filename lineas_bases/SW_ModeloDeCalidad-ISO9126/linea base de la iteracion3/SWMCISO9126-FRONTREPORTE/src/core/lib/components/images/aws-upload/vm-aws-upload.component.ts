import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FileItem } from '@core/lib/components/images/drop-zone/file-item.class';
import { AwsService } from '@providers/services/aws/aws.service';
import { uniqueID } from '@shared/helpers/functions/generate-keys';

export interface IEventProgress {
  error: boolean;
  finalize: boolean;
  message: string;
  percent: number;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-aws-upload',
  templateUrl: './vm-aws-upload.component.html'
})

export class VMAwsUploadComponent implements OnInit {

  @HostBinding('class')
  get rootClass(): string {
    return 'g-aws';
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

  events: Array<IEventProgress>;
  constructor(
    private readonly aws: AwsService
  ) {
    this.events = [];
  }

  ngOnInit(): void { }

  async getImages(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      Promise.all(this.getPromises(this.files))
        .then((result: Array<string>) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  getPromises(filesItem: Array<FileItem>): Array<Promise<string>> {
    const files = this.parseFiles(filesItem);
    const arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(this.uploadToS3(files[i], i));
    }

    return arr;
  }

  parseFiles(files: Array<FileItem>): Array<File> {
    const arr = [];
    const buffEv = [];
    for (const file of files) {
      buffEv.push(this.getNewProgress());
      arr.push(file.file);
    }
    this.events = [...buffEv];

    return arr;
  }

  getParamsS3(file: File): any {
    return {
      Key: `${uniqueID()}.${file.name.split('.')[file.name.split('.').length - 1]}`,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
    };
  }

  async uploadToS3(file: File, index: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const s3 = this.aws.getS3();
      s3.upload(this.getParamsS3(file))
        .on('httpUploadProgress', (event: any) => {
          this.events[index].finalize = false;
          const percent = Math.floor((event.loaded * 100) / event.total);
          this.events[index].percent = percent;
          this.events[index].message = `${file.name}`;
        })
        .send((err, data) => {
          if (err) {
            this.events[index].error = true;
            this.events[index].finalize = true;
            reject(err);
          } else {
            this.events[index].finalize = true;
            resolve(`http://salon.assets.vertemejor.com/${data.Key}`);
          }
        });
    });
  }

  getNewProgress(): IEventProgress {
    return {
      error: false,
      finalize: false,
      message: '',
      percent: 0
    };
  }

  trackByFn(index, item): number {
    return item;
  }

}
