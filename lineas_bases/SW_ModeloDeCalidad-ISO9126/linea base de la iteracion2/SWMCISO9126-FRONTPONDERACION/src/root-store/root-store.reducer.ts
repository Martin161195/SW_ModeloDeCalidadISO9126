import { Action, ActionReducer, createReducer } from '@ngrx/store';
import { State } from './root-store';

// tslint:disable-next-line: only-arrow-functions
export function rootStoreReducer(state: State | undefined, action: Action): ActionReducer<any> {
  return createReducer({});
}
