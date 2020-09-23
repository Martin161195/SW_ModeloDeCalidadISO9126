import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectToken } from '@store/auth-store/selectors';
import { RootStoreState } from '@store/index';
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly store$: Store<RootStoreState.State>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store$
      .pipe(
        select(selectToken),
        first(),
        flatMap((token: string) => {
          if (req.withCredentials) {
            const cloneReq = req.clone({
              setHeaders: { Authorization: `bearer ${token}` }
            });

            return next.handle(cloneReq);
          }

          return next.handle(req);
        })
      );
  }

}
