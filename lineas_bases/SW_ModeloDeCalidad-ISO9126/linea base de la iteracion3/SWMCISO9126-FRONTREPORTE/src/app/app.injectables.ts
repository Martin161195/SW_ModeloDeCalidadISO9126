import { URL_APP, URL_TIDIO } from '@settings/config/config';

export const AppInjectables = [
  { provide: URL_APP, useValue: URL_APP },
  { provide: URL_TIDIO, useValue: URL_TIDIO }
];
