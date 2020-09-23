import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IBreadcrumb, stringFormat } from '../vm-breadcrumb.shared';

export class VMBreadcrumbResolver implements Resolve<Array<IBreadcrumb>> {

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<IBreadcrumb>> | Promise<Array<IBreadcrumb>> | Array<IBreadcrumb> {

    const data = route.routeConfig.data;
    const path = this.getFullPath(route);

    let text = typeof (data.breadcrumb) === 'string' ? data.breadcrumb : data.breadcrumb.text || data.text || path;
    text = stringFormat(text, route.data);

    const crumbs: Array<IBreadcrumb> = [{
      text,
      path
    }];

    return of(crumbs);
  }

  getFullPath(route: ActivatedRouteSnapshot): string {
    // tslint:disable-next-line: no-parameter-reassignment
    const relativePath = (segments: Array<UrlSegment>) => segments.reduce((a, v) => a += `/${v.path}`, '');
    // tslint:disable-next-line: no-parameter-reassignment
    const fullPath = (routes: Array<ActivatedRouteSnapshot>) => routes.reduce((a, v) => a += relativePath(v.url), '');

    return fullPath(route.pathFromRoot);
  }
}
