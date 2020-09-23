import { Action, createReducer, on } from '@ngrx/store';
import * as GeneralStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(GeneralStoreActions.sidebarDesktopOpen, (state: State) => ({
    ...state,
    sidebarDesktop: true
  })),
  on(GeneralStoreActions.sidebarDesktopClose, (state: State) => ({
    ...state,
    sidebarDesktop: false
  })),
  on(GeneralStoreActions.clickButtonRefreshInit, (state: State) => ({
    ...state,
    clickButtonRefresh: true
  })),
  on(GeneralStoreActions.clickButtonRefreshEnd, (state: State) => ({
    ...state,
    clickButtonRefresh: false
  })),
  on(GeneralStoreActions.menuSidebarInit, (state: State, { items }) => ({
    ...state,
    menuSidebar: [...items]
  })),
  on(GeneralStoreActions.menuSidebarDestroy, (state: State) => ({
    ...state,
    menuSidebar: null
  })),
  on(GeneralStoreActions.getDocumentTypes, (state: State) => ({
    ...state,
    isLoadingGetDocumentTypes: true,
    isLoadingGeneral: true
  })),
  on(GeneralStoreActions.getDocumentTypesSuccess, (state: State, { documentTypes }) => ({
    ...state,
    isLoadingGetDocumentTypes: false,
    isLoadingGeneral: false,
    documentTypes
  })),
  on(GeneralStoreActions.getPlanes, (state: State) => ({
    ...state,
    isLoadingGetPlanes: true,
    isLoadingGeneral: true
  })),
  on(GeneralStoreActions.getPlanesSuccess, (state: State, { planes }) => ({
    ...state,
    isLoadingGetPlanes: false,
    isLoadingGeneral: false,
    planes
  })),
  on(GeneralStoreActions.openAlertPlan, (state: State, { data }) => ({
    ...state,
    alertPlan: { ...data }
  })),
  on(GeneralStoreActions.closeAlertPlan, (state: State) => ({
    ...state,
    alertPlan: null
  })),
  on(GeneralStoreActions.generalFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(GeneralStoreActions.generalSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(GeneralStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(GeneralStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(GeneralStoreActions.clearGeneral, (state: State) => ({
    sidebarDesktop: true,
    clickButtonRefresh: false,
    menuSidebar: null,
    documentTypes: null,
    planes: null,
    alertPlan: null,
    error: null,
    success: null,
    isLoadingGetDocumentTypes: false,
    isLoadingGetPlanes: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function generalReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
