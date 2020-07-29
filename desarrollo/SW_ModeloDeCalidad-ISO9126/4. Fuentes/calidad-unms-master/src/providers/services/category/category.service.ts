import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { CategoryEndpoint } from '@providers/endpoints/category.endpoint';
import { URL_APP } from '@settings/config/config';
import { Category } from '@shared/models/category/category.class';
import { ICategory } from '@shared/models/category/category.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  get(): Observable<Array<Category>> {
    const query = `${this.apiUrl}${CategoryEndpoint.get}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<ICategory>) => res.map((obj: ICategory) => new Category(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

}
