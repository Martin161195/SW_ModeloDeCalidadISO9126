import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { IBreadcrumb } from '../vm-breadcrumb.shared';

// tslint:disable-next-line:max-line-length
export type IPostProcessFunc = (crumbs: Array<IBreadcrumb>) => Promise<Array<IBreadcrumb>> | Observable<Array<IBreadcrumb>> | Array<IBreadcrumb>;

@Injectable()
export class VMBreadcrumbConfig {
  postProcess: IPostProcessFunc;
}
