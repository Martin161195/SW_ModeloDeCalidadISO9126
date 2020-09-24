import { from, Observable, of } from 'rxjs';

// Angular makes it impossible to make modules optional :(

// try {
//   const _ = r('lodash');
//   _template = _.template;
//   _templateSettings = _.templateSetting
// } catch (e) {
//   try {
//     _template = r('lodash.template');
//     _templateSettings = r('lodash.templatesettings');
//   } catch (e) {
//     _template = (y) => (x) => y;
//     _templateSettings = {};
//   }
// } finally {
//   _templateSettings.interpolate = /{{([\s\S]+?)}}/g;
// }

import * as template from 'lodash.template';
import * as templateSettings from 'lodash.templatesettings';

const _ = {
  template,
  templateSettings
};

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export interface IBreadcrumb {
  text: string;
  path: string;
}

/* declare var require: any;

function r(module: any): any {
  return require(`${name}`);
} */

export const stringFormat = (templ: string, binding: any): string => {
  const compiled = _.template(templ);

  return compiled(binding);
};

export const isPromise = (value: any): boolean => {
  return value && (typeof value.then === 'function');
};

export const wrapIntoObservable = <T>(value: T | Promise<T> | Observable<T>)
  : Observable<T> => {

  if (value instanceof Observable) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value as T);
};
