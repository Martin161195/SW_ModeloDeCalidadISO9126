import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { URL_TIDIO } from '@settings/config/config';
import { Observable, Observer } from 'rxjs';

export interface ITidioIdentify {
  distinct_id: string;
  email: string;
  name: string;
  city: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class TidioService {

  private readonly tidioId: string;
  loaded: boolean;
  tidioChatApi: any;
  tidioIdentify: ITidioIdentify;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(URL_TIDIO) private readonly tidioUrl: string
  ) {
    this.tidioId = 'admin-vm-tidio-chat';
    this.loaded = false;
  }

  load(): Observable<void> {
    return new Observable<void>(
      (observer: Observer<void>) => {
        let scriptElement: any = this.document.getElementById(this.tidioId);
        if (!!scriptElement || this.loaded) {
          observer.next();
          observer.complete();
        } else {
          scriptElement = this.document.createElement('script');
          // scriptElement.type = 'text/javascript';
          scriptElement.src = this.tidioUrl;
          scriptElement.async = true;
          scriptElement.id = this.tidioId;

          scriptElement.onload = () => {
            this.loaded = true;
            observer.next();
            observer.complete();
          };

          scriptElement.onerror = (error: any) => {
            observer.error(`No se puedo abrir la URL: ${this.tidioUrl}`);
          };

          document.getElementsByTagName('head')[0]
            .appendChild(scriptElement);
        }
      }
    );
  }

  register(): void {
    this.document.addEventListener('tidioChat-ready', () => {
      this.tidioChatApi = (window as any).tidioChatApi;
      this.display(false);
    });

    this.document.addEventListener('tidioChat-close', () => {
      this.display(false);
    });
  }

  open(): void {
    if (!!this.tidioChatApi) { this.tidioChatApi.open(); }
  }

  close(): void {
    if (!!this.tidioChatApi) { this.tidioChatApi.close(); }
  }

  display(value: boolean) {
    if (!!this.tidioChatApi) { this.tidioChatApi.display(!!value); }
  }

  setTidioIdentify(value: ITidioIdentify): void {
    const interval = setInterval(() => {
      if (!!this.tidioChatApi) {
        this.tidioIdentify = { ...value };
        if (!!value) {
          this.tidioChatApi.setVisitorData({ ...this.tidioIdentify });
        }
        clearInterval(interval);
      }
    }, 100);
  }

}
