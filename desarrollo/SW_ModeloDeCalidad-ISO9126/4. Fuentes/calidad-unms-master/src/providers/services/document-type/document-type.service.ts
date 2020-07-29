import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { DocumentTypeEndpoint } from '@providers/endpoints/document-type.endpoint';
import { URL_APP } from '@settings/config/config';
import { DocumentType } from '@shared/models/document-type/document-type.class';
import { IDocumentType } from '@shared/models/document-type/document-type.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<DocumentType>> {
    const query = `${this.apiUrl}${DocumentTypeEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IDocumentType>) => res.map((obj: IDocumentType) => new DocumentType(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
