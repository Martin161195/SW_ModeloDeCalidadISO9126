import { createAction, props } from '@ngrx/store';
import { IMenuSidebar } from '@shared/common/interfaces/menu-sidebar.interface';
import { DocumentType } from '@shared/models/document-type/document-type.class';
import { Plan } from '@shared/models/plan/plan.class';
import { VMAlert } from '@shared/models/vmalert/vm-alert.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  SIDEBARDESKTOPOPEN = '[AUTH] Sidebar Desktop Open',
  SIDEBARDESKTOPCLOSE = '[AUTH] Sidebar Desktop Close',
  CLICKBUTTONREFRESHINIT = '[GENERAL] Click Button Refresh Init',
  CLICKBUTTONREFRESHEND = '[GENERAL] Click Button Refresh End',
  MENUSIDEBARINIT = '[GENERAL] Menu Sidebar Show',
  MENUSIDEBARDESTROY = '[GENERAL] Menu Sidebar Destroy',
  // DocumentType actions
  GETDOCUMENTTYPES = '[GENERAL] Get Document Types',
  GETDOCUMENTTYPESSUCCESS = '[GENERAL] Get Document Types Success',
  // Plan actions
  GETPLANES = '[GENERAL] Get Planes',
  GETPLANESSUCCESS = '[GENERAL] Get Planes Success',
  OPENALERTPLAN = '[GENERAL] Open Alert Plan',
  CLOSEALERTPLAN = '[GENERAL] Close Alert Plan',
  // Error global service
  GENERALSUCCESS = '[GENERAL] General Success',
  GENERALFAILURE = '[GENERAL] General Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[GENERAL] Error To Null',
  SUCCESSTONULL = '[GENERAL] Success To Null',
  // Clear state
  CLEARGENERAL = '[GENERAL] Clear General'
}

export const sidebarDesktopOpen = createAction(
  ActionTypes.SIDEBARDESKTOPOPEN
);

export const sidebarDesktopClose = createAction(
  ActionTypes.SIDEBARDESKTOPCLOSE
);

export const clickButtonRefreshInit = createAction(
  ActionTypes.CLICKBUTTONREFRESHINIT
);

export const clickButtonRefreshEnd = createAction(
  ActionTypes.CLICKBUTTONREFRESHEND
);

export const menuSidebarInit = createAction(
  ActionTypes.MENUSIDEBARINIT,
  props<{ items: Array<IMenuSidebar> }>()
);

export const menuSidebarDestroy = createAction(
  ActionTypes.MENUSIDEBARDESTROY
);

export const getDocumentTypes = createAction(
  ActionTypes.GETDOCUMENTTYPES
);

export const getDocumentTypesSuccess = createAction(
  ActionTypes.GETDOCUMENTTYPESSUCCESS,
  props<{ documentTypes: Array<DocumentType> }>()
);

export const getPlanes = createAction(
  ActionTypes.GETPLANES
);

export const getPlanesSuccess = createAction(
  ActionTypes.GETPLANESSUCCESS,
  props<{ planes: Array<Plan> }>()
);

export const openAlertPlan = createAction(
  ActionTypes.OPENALERTPLAN,
  props<{ data: VMAlert }>()
);

export const closeAlertPlan = createAction(
  ActionTypes.CLOSEALERTPLAN
);

export const generalSuccess = createAction(
  ActionTypes.GENERALSUCCESS,
  props<{ data: VMSuccess }>()
);

export const generalFailure = createAction(
  ActionTypes.GENERALFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearGeneral = createAction(
  ActionTypes.CLEARGENERAL
);
