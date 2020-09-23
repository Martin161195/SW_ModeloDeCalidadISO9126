import { createAction, props } from '@ngrx/store';
import { LocalBusinessInformation, LocalGeneralInformation, LocalResponse } from '@shared/models/local/local.class';
import { ILocalBusinessForm, ILocalGeneralInformationEditRequest, ILocalStatusEditRequest } from '@shared/models/local/local.interface';
import { Plan } from '@shared/models/plan/plan.class';
import { IPlanUpdateRequest } from '@shared/models/plan/plan.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETLOCAL = '[LOCAL] Get Local',
  GETLOCALSUCCESS = '[LOCAL] Get Local Success',
  UPDATELOCAL = '[LOCAL] Update Local',
  UPDATELOCALSUCCESS = '[LOCAL] Update Local Success',
  UPDATELOCALSTATUS = '[LOCAL] Update Local Status',
  UPDATELOCALSTATUSSUCCESS = '[LOCAL] Update Local Status Success',
  UPDATELOCALBUSINESS = '[LOCAL] Update Local Business',
  UPDATELOCALBUSINESSSUCCESS = '[LOCAL] Update Local Business Success',
  // Plan
  SETPLAN = '[Local] Set Plan',
  GETPLAN = '[Local] Get Plan',
  GETPLANSUCCESS = '[Local] Get Plan Success',
  UPDATEPLAN = '[Local] Update Plan',
  UPDATEPLANSUCCESS = '[Local] Update Plan Success',
  // Error global service
  LOCALSUCCESS = '[LOCAL] Local Success',
  LOCALFAILURE = '[LOCAL] Local Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[LOCAL] Error To Null',
  SUCCESSTONULL = '[LOCAL] Success To Null',
  // Clear state
  CLEARPLAN = '[LOCAL] Clear Plan',
  CLEARLOCAL = '[LOCAL] Clear Local'
}

export const getLocal = createAction(
  ActionTypes.GETLOCAL
);

export const getLocalSuccess = createAction(
  ActionTypes.GETLOCALSUCCESS,
  props<{ local: LocalResponse }>()
);

export const updateLocal = createAction(
  ActionTypes.UPDATELOCAL,
  props<{ newLocal: ILocalGeneralInformationEditRequest }>()
);

export const updateLocalSuccess = createAction(
  ActionTypes.UPDATELOCALSUCCESS,
  props<{ local: LocalGeneralInformation }>()
);

export const updateLocalStatus = createAction(
  ActionTypes.UPDATELOCALSTATUS,
  props<{ newLocal: ILocalStatusEditRequest }>()
);

export const updateLocalStatusSuccess = createAction(
  ActionTypes.UPDATELOCALSTATUSSUCCESS,
  props<{ local: LocalResponse }>()
);

export const updateLocalBusiness = createAction(
  ActionTypes.UPDATELOCALBUSINESS,
  props<{ newLocal: ILocalBusinessForm }>()
);

export const updateLocalBusinessSuccess = createAction(
  ActionTypes.UPDATELOCALBUSINESSSUCCESS,
  props<{ local: LocalBusinessInformation }>()
);

export const setPlan = createAction(
  ActionTypes.SETPLAN,
  props<{ plan: Plan }>()
);

export const getPlan = createAction(
  ActionTypes.GETPLAN
);

export const getPlanSuccess = createAction(
  ActionTypes.GETPLANSUCCESS,
  props<{ plan: Plan }>()
);

export const updatePlan = createAction(
  ActionTypes.UPDATEPLAN,
  props<{ newPlan: IPlanUpdateRequest }>()
);

export const updatePlanSuccess = createAction(
  ActionTypes.UPDATEPLANSUCCESS,
  props<{ plan: Plan }>()
);

export const localSuccess = createAction(
  ActionTypes.LOCALSUCCESS,
  props<{ data: VMSuccess }>()
);

export const localFailure = createAction(
  ActionTypes.LOCALFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearPlan = createAction(
  ActionTypes.CLEARPLAN
);

export const clearLocal = createAction(
  ActionTypes.CLEARLOCAL
);
