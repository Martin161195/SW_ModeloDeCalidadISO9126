import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LocalResponse } from '@shared/models/local/local.class';
import { ILocalBusinessForm, ILocalInformationForm, ILocalStatusForm } from '@shared/models/local/local.interface';
import { Plan } from '@shared/models/plan/plan.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetLocal = (state: State): boolean => state.isLoadingGetLocal;

const getIsLoadingUpdateLocal = (state: State): boolean => state.isLoadingUpdateLocal;

const getIsLoadingUpdateLocalStatus = (state: State): boolean => state.isLoadingUpdateLocalStatus;

const getIsLoadingUpdateLocalBusiness = (state: State): boolean => state.isLoadingUpdateLocalBusiness;

const getIsLoadingGetPlan = (state: State): boolean => state.isLoadingGetPlan;

const getIsLoadingUpdatePlan = (state: State): boolean => state.isLoadingUpdatePlan;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getLocal = (state: State): LocalResponse | null => state.local;

const getLocalInformationForm = (state: State): ILocalInformationForm | null => state.localInformationForm;

const getLocalStatusForm = (state: State): ILocalStatusForm | null => state.localStatusForm;

const getLocalBusinessForm = (state: State): ILocalBusinessForm | null => state.localBusinessForm;

const getPlan = (state: State): Plan | null => state.plan;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('local');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectState,
  getSuccess
);

export const selectIsLoadingGetLocal: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetLocal
);

export const selectIsLoadingUpdateLocal: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateLocal
);

export const selectIsLoadingUpdateLocalStatus: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateLocalStatus
);

export const selectIsLoadingUpdateLocalBusiness: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdateLocalBusiness
);

export const selectIsLoadingGetPlan: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGetPlan
);

export const selectIsLoadingUpdatePlan: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingUpdatePlan
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoadingGeneral
);

export const selectLocal: MemoizedSelector<object, LocalResponse | null> = createSelector(
  selectState,
  getLocal
);

export const selectLocalInformationForm: MemoizedSelector<object, ILocalInformationForm | null> = createSelector(
  selectState,
  getLocalInformationForm
);

export const selectLocalStatusForm: MemoizedSelector<object, ILocalStatusForm | null> = createSelector(
  selectState,
  getLocalStatusForm
);

export const selectLocalBusinessForm: MemoizedSelector<object, ILocalBusinessForm | null> = createSelector(
  selectState,
  getLocalBusinessForm
);

export const selectPlan: MemoizedSelector<object, Plan | null> = createSelector(
  selectState,
  getPlan
);
