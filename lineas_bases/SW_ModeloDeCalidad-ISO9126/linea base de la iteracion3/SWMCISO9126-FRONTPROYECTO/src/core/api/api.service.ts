import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { Observable, throwError } from 'rxjs';

export const CONTENT_TYPE: any = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data'
};

export interface IOptionsRequest {
  requestType?: string;
  responseType?: 'json' | 'arraybuffer' | 'blob';
  withCredentials?: boolean;
  params?: { [param: string]: any };
  observe?: 'body' | 'events' | 'response';
}

export class OptionsRequestBefore {
  requestType?: string;
  /**
   * @description
   * Puede tomar los valores de 'json', 'arraybuffer', 'blob'
   */
  responseType?: 'json' | 'arraybuffer' | 'blob';
  withCredentials?: boolean;
  params?: { [param: string]: any };
  /**
   * @description
   * Puede tomar los valores de 'body', 'events', 'response'
   */
  observe?: 'body' | 'events' | 'response';
  constructor(obj?: IOptionsRequest) {
    this.observe = obj && obj.observe || 'body';
    this.params = obj && obj.params || null;
    this.requestType = obj && obj.requestType || CONTENT_TYPE.JSON;
    this.responseType = obj && obj.responseType || 'json';
    this.withCredentials = obj && obj.withCredentials || false;
  }
}

export class OptionsRequest {
  headers?: HttpHeaders | { [header: string]: string | Array<string>; };
  observe?: any;
  params?: HttpParams | { [param: string]: any | Array<any>; };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  constructor(obj?: any) {
    this.headers = obj && obj.headers || null;
    this.observe = obj && obj.observe || 'body';
    this.params = obj && obj.params || null;
    this.responseType = obj && obj.responseType || 'json';
    this.withCredentials = obj && obj.withCredentials || false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private readonly http: HttpClient
  ) { }

  get<T>(endPoint: string, options: OptionsRequestBefore): Observable<T> {
    const request = this.getUrlAndParameters(endPoint, options);

    return this.http
      .get<T>(request.url, request.options);
  }

  delete<T>(endPoint: string, options: OptionsRequestBefore): Observable<T> {
    const request = this.getUrlAndParameters(endPoint, options);

    return this.http
      .delete<T>(request.url, request.options);
  }

  post<T>(endPoint: string, options: OptionsRequestBefore, data: any): Observable<T> {
    const request = this.getUrlAndParameters(endPoint, options);
    const body = this.getBodyRequest(data, options.requestType);

    return this.http
      .post<T>(request.url, body, request.options);
  }

  put<T>(endPoint: string, options: OptionsRequestBefore, data: any): Observable<T> {
    const request = this.getUrlAndParameters(endPoint, options);
    const body = this.getBodyRequest(data, options.requestType);

    return this.http
      .put<T>(request.url, body, request.options);
  }

  private isParameterInPath(endPoint: string, parameterKey: string): boolean {
    return !(endPoint.indexOf(`{${parameterKey}}`) === -1);
  }

  private getUrlAndParameters(url: string, optionsRequest: OptionsRequestBefore): { url: string; options: OptionsRequest } {
    let newUrl = url;
    const options: OptionsRequest = new OptionsRequest(optionsRequest);
    if (optionsRequest.params) {
      let paramsQuery = new HttpParams();
      Object.keys(optionsRequest.params)
        .forEach((parameterKey: string) => {
          if (this.isParameterInPath(newUrl, parameterKey)) {
            newUrl = newUrl.replace(`{${parameterKey}}`, optionsRequest.params[parameterKey]);
          } else {
            paramsQuery = paramsQuery.append(parameterKey, optionsRequest.params[parameterKey]);
          }
        });
      /**
       * Se setea los params del request
       */
      options.params = paramsQuery;
    }
    /**
     * Se setea los headers del request
     */
    let headers = new HttpHeaders();
    if (optionsRequest.requestType !== CONTENT_TYPE.FORM_DATA) { headers = headers.append('Content-Type', optionsRequest.requestType); }
    options.headers = headers;
    /**
     * Se setea si se authentifica
     */
    options.withCredentials = optionsRequest.withCredentials;
    /**
     * Se setea el response del request
     */
    options.observe = optionsRequest.observe;
    /**
     * Se setea el tipo de response
     */
    options.responseType = optionsRequest.responseType;

    return {
      url: newUrl,
      options
    };
  }

  private getBodyRequest(body: any, contentType: string): FormData | string {
    let data: FormData | string;
    switch (contentType) {
      case CONTENT_TYPE.JSON:
        data = JSON.stringify(body);
        break;
      case CONTENT_TYPE.FORM_DATA:
        const formData = new FormData();
        for (const key of Object.keys(body)) {
          if (body.hasOwnProperty(key)) {
            formData.append(key, body[key]);
          }
        }
        data = formData;
        break;
      default:
        data = JSON.stringify(body);
        break;
    }

    return data;
  }

  handleError(error: HttpErrorResponse): Observable<VMError | any> {
    let messageError: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      messageError = `An error occurred: ${error.error.message}`;
      console.error(messageError);
      /* this.notifyService.addError(`Error: ${messageError}`); */

      return throwError(messageError);
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    const vmError = new VMError(error.error);
    messageError = `` +
      `Backend returned code ${vmError.status},` +
      `error was: ${vmError.error}` +
      `\nMessage: ${vmError.message}`
      ;
    console.error(messageError);
    /* this.notifyService.addErrorWithData(`Error: ${messageError}`, error); */

    /* return this.handleError(error); */
    return throwError(vmError);
  }

}
