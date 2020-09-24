import { UserLocal } from '@shared/models/user-local/user-local.class';

// tslint:disable-next-line: interface-name
export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: UserLocal | null;
  // token for request
  token: string | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for authentication
  isLoading: boolean;
}

export const initialState: State = {
  isAuthenticated: !!localStorage.getItem('user'),
  user: !!localStorage.getItem('user') ? new UserLocal(JSON.parse(localStorage.getItem('user'))) : null,
  token: !!localStorage.getItem('security') ? atob(localStorage.getItem('security')) : null,
  error: null,
  success: null,
  isLoading: false
};
