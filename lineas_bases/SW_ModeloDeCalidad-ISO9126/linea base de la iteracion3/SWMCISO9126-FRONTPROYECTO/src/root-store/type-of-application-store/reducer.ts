import { Action, createReducer, on } from '@ngrx/store';
import * as TypeOfApplicationStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(TypeOfApplicationStoreActions.getTypeOfApplications, (state: State) => ({
    ...state,
    isLoadingGetTypeOfApplications: true,
    isLoadingGeneral: true
  })),
  on(TypeOfApplicationStoreActions.getTypeOfApplicationsSuccess, (state: State, { applications }) => ({
    ...state,
    isLoadingGetTypeOfApplications: false,
    isLoadingGeneral: false,
    typeOfApplications: [...applications]
  })),
  on(TypeOfApplicationStoreActions.getLocalTypeOfApplications, (state: State) => ({
    ...state,
    isLoadingGetLocalTypeOfApplications: true,
    isLoadingGeneral: true
  })),
  on(TypeOfApplicationStoreActions.getLocalTypeOfApplicationsSuccess, (state: State, { applications }) => ({
    ...state,
    isLoadingGetLocalTypeOfApplications: false,
    isLoadingGeneral: false,
    localTypeOfApplications: [...applications]
  })),
  on(TypeOfApplicationStoreActions.getEstablishmentTypeOfApplications, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentTypeOfApplications: true,
    isLoadingGeneral: true
  })),
  on(TypeOfApplicationStoreActions.getEstablishmentTypeOfApplicationsSuccess, (state: State, { applications }) => ({
    ...state,
    isLoadingGetEstablishmentTypeOfApplications: false,
    isLoadingGeneral: false,
    establishmentTypeOfApplications: [...applications]
  })),
  on(TypeOfApplicationStoreActions.typeOfApplicationFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(TypeOfApplicationStoreActions.typeOfApplicationSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(TypeOfApplicationStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(TypeOfApplicationStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(TypeOfApplicationStoreActions.clearTypeOfApplication, (state: State) => ({
    typeOfApplications: null,
    localTypeOfApplications: null,
    establishmentTypeOfApplications: null,
    error: null,
    success: null,
    isLoadingGetTypeOfApplications: false,
    isLoadingGetLocalTypeOfApplications: false,
    isLoadingGetEstablishmentTypeOfApplications: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function typeOfApplicationReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
