import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LocalEstablishment, LocalEstablishmentResponse } from '@shared/models/local-establishment/local-establishment.class';
import { ILocalEstablishmentInformationForm, ILocalEstablishmentStatusForm } from '@shared/models/local-establishment/local-establishment.interface';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingCreate = (state: State): boolean => state.isLoadingCreate;

const getIsLoadingUpdateEstablishmentForm = (state: State): boolean => state.isLoadingUpdateEstablishmentForm;

const getIsLoadingUpdateEstablishmentStatus = (state: State): boolean => state.isLoadingUpdateEstablishmentStatus;

const getIsLoadingGetEstablishments = (state: State): boolean => state.isLoadingGetEstablishments;

const getIsLoadingGetEstablishmentGeneralInformation = (state: State): boolean => state.isLoadingGetEstablishmentGeneralInformation;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getEstablishment = (state: State): LocalEstablishment | null => state.establishment;

const getEstablishmentGeneralInformation = (state: State): LocalEstablishmentResponse | null => state.establishmentGeneralInformation;

const getEstablishmentInformationForm = (state: State): ILocalEstablishmentInformationForm | null => state.establishmentInformationForm;

const getEstablishmentStatusForm = (state: State): ILocalEstablishmentStatusForm | null => state.establishmentStatusForm;

const getEstablishments = (state: State): Array<LocalEstablishment> => state.establishments;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalSelect = (state: State): boolean => state.modalSelect;

export const selectEstablishmentState: MemoizedSelector<object, State> = createFeatureSelector<State>('establishment');

export const selectEstablishmentError: MemoizedSelector<object, string | null> = createSelector(
  selectEstablishmentState,
  getError
);

export const selectEstablishmentSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectEstablishmentState,
  getSuccess
);

export const selectEstablishmentIsLoadingCreate: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getIsLoadingCreate
);

export const selectIsLoadingUpdateEstablishmentForm: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getIsLoadingUpdateEstablishmentForm
);

export const selectIsLoadingUpdateEstablishmentStatus: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getIsLoadingUpdateEstablishmentStatus
);

export const selectIsLoadingGetEstablishments: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getIsLoadingGetEstablishments
);

export const selectIsLoadingGetEstablishmentGeneralInformation: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getIsLoadingGetEstablishmentGeneralInformation
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getIsLoadingGeneral
);

export const selectEstablishment: MemoizedSelector<object, LocalEstablishment | null> = createSelector(
  selectEstablishmentState,
  getEstablishment
);

export const selectEstablishmentInformationForm: MemoizedSelector<object, ILocalEstablishmentInformationForm | null> = createSelector(
  selectEstablishmentState,
  getEstablishmentInformationForm
);

export const selectEstablishmentStatusForm: MemoizedSelector<object, ILocalEstablishmentStatusForm | null> = createSelector(
  selectEstablishmentState,
  getEstablishmentStatusForm
);

export const selectEstablishments: MemoizedSelector<object, Array<LocalEstablishment>> = createSelector(
  selectEstablishmentState,
  getEstablishments
);

export const selectEstablishmentGeneralInformation: MemoizedSelector<object, LocalEstablishmentResponse> = createSelector(
  selectEstablishmentState,
  getEstablishmentGeneralInformation
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getModalCreate
);

export const selectModalSelect: MemoizedSelector<object, boolean> = createSelector(
  selectEstablishmentState,
  getModalSelect
);
