import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TypeOfApplication } from '@shared/models/type-of-application/type-of-application.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetTypeOfApplications = (state: State): boolean => state.isLoadingGetTypeOfApplications;

const getIsLoadingGetLocalTypeOfApplications = (state: State): boolean => state.isLoadingGetLocalTypeOfApplications;

const getIsLoadingGetEstablishmentTypeOfApplications = (state: State): boolean => state.isLoadingGetEstablishmentTypeOfApplications;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getTypeOfApplications = (state: State): Array<TypeOfApplication> | null => state.typeOfApplications;

const getLocalTypeOfApplications = (state: State): Array<TypeOfApplication> | null => state.localTypeOfApplications;

const getEstablishmentTypeOfApplications = (state: State): Array<TypeOfApplication> | null => state.establishmentTypeOfApplications;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('type-of-application');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetTypeOfApplications: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetTypeOfApplications
);

export const selectIsLoadingGetLocalTypeOfApplications: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetLocalTypeOfApplications
);

export const selectIsLoadingGetEstablishmentTypeOfApplications: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetEstablishmentTypeOfApplications
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectTypeOfApplications: MemoizedSelector<object, Array<TypeOfApplication> | null> = createSelector(
  selectState,
  getTypeOfApplications
);

export const selectLocalTypeOfApplications: MemoizedSelector<object, Array<TypeOfApplication> | null> = createSelector(
  selectState,
  getLocalTypeOfApplications
);

export const selectEstablishmentTypeOfApplications: MemoizedSelector<object, Array<TypeOfApplication> | null> = createSelector(
  selectState,
  getEstablishmentTypeOfApplications
);
