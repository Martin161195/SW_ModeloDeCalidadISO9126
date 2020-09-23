import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsAuthenticated = (state: State): boolean => state.isAuthenticated;

const getIsLoading = (state: State): boolean => state.isLoading;

const getUser = (state: State): UserLocal | null => state.user;

const getToken = (state: State): string | null => state.token;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>('auth');

export const selectAuthError: MemoizedSelector<object, string | null> = createSelector(
  selectAuthState,
  getError
);

export const selectAuthSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectAuthState,
  getSuccess
);

export const selectAuthIsAuthenticated: MemoizedSelector<object, boolean> = createSelector(
  selectAuthState,
  getIsAuthenticated
);

export const selectAuthIsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectAuthState,
  getIsLoading
);

export const selectAuthUser: MemoizedSelector<object, UserLocal | null> = createSelector(
  selectAuthState,
  getUser
);

export const selectToken: MemoizedSelector<object, string | null> = createSelector(
  selectAuthState,
  getToken
);
