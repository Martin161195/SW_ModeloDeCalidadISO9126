import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IMenuSidebar } from '@shared/common/interfaces/menu-sidebar.interface';
import { DocumentType } from '@shared/models/document-type/document-type.class';
import { Plan } from '@shared/models/plan/plan.class';
import { VMAlert } from '@shared/models/vmalert/vm-alert.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getSidebarDesktop = (state: State): boolean => state.sidebarDesktop;

const getClickButtonRefresh = (state: State): boolean => state.clickButtonRefresh;

const getMenuSidebar = (state: State): Array<IMenuSidebar> | null => state.menuSidebar;

const getIsLoadingGetDocumentTypes = (state: State): boolean => state.isLoadingGetDocumentTypes;

const getIsLoadingGetPlanes = (state: State): boolean => state.isLoadingGetPlanes;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getDocumentTypes = (state: State): Array<DocumentType> | null => state.documentTypes;

const getPlanes = (state: State): Array<Plan> | null => state.planes;

const getAlertPlan = (state: State): VMAlert | null => state.alertPlan;

export const selectGeneralState: MemoizedSelector<object, State> = createFeatureSelector<State>('general');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectGeneralState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectGeneralState,
  getSuccess
);

export const selectSidebarDesktop: MemoizedSelector<object, boolean> = createSelector(
  selectGeneralState,
  getSidebarDesktop
);

export const selectClickButtonRefresh: MemoizedSelector<object, boolean> = createSelector(
  selectGeneralState,
  getClickButtonRefresh
);

export const selectMenuSidebar: MemoizedSelector<object, Array<IMenuSidebar> | null> = createSelector(
  selectGeneralState,
  getMenuSidebar
);

export const selectIsLoadingGetDocumentTypes: MemoizedSelector<object, boolean> = createSelector(
  selectGeneralState,
  getIsLoadingGetDocumentTypes
);

export const selectIsLoadingGetPlanes: MemoizedSelector<object, boolean> = createSelector(
  selectGeneralState,
  getIsLoadingGetPlanes
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectGeneralState,
  getIsLoadingGeneral
);

export const selectDocumentTypes: MemoizedSelector<object, Array<DocumentType> | null> = createSelector(
  selectGeneralState,
  getDocumentTypes
);

export const selectPlanes: MemoizedSelector<object, Array<Plan> | null> = createSelector(
  selectGeneralState,
  getPlanes
);

export const selectAlertPlan: MemoizedSelector<object, VMAlert | null> = createSelector(
  selectGeneralState,
  getAlertPlan
);
