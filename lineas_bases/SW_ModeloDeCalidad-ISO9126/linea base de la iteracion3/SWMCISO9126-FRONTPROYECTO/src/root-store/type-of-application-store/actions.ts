import { createAction, props } from '@ngrx/store';
import { TypeOfApplication } from '@shared/models/type-of-application/type-of-application.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETTYPEOFAPPLICATIONS = '[TYPEOFAPPLICATION] Get TypeOfApplications',
  GETTYPEOFAPPLICATIONSSUCCESS = '[TYPEOFAPPLICATION] Get TypeOfApplications Success',
  GETLOCALTYPEOFAPPLICATIONS = '[TYPEOFAPPLICATION] Get Local TypeOfApplications',
  GETLOCALTYPEOFAPPLICATIONSSUCCESS = '[TYPEOFAPPLICATION] Get Local TypeOfApplications Success',
  GETESTABLISHMENTTYPEOFAPPLICATIONS = '[TYPEOFAPPLICATION] Get Establishment TypeOfApplications',
  GETESTABLISHMENTTYPEOFAPPLICATIONSSUCCESS = '[TYPEOFAPPLICATION] Get Establishment TypeOfApplications Success',
  // Error global service
  TYPEOFAPPLICATIONSUCCESS = '[TYPEOFAPPLICATION] TypeOfApplication Success',
  TYPEOFAPPLICATIONFAILURE = '[TYPEOFAPPLICATION] TypeOfApplication Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[TYPEOFAPPLICATION] Error To Null',
  SUCCESSTONULL = '[TYPEOFAPPLICATION] Success To Null',
  // Clear state
  CLEARTYPEOFAPPLICATION = '[TYPEOFAPPLICATION] Clear TypeOfApplication'
}

export const getTypeOfApplications = createAction(
  ActionTypes.GETTYPEOFAPPLICATIONS
);

export const getTypeOfApplicationsSuccess = createAction(
  ActionTypes.GETTYPEOFAPPLICATIONSSUCCESS,
  props<{ applications: Array<TypeOfApplication> }>()
);

export const getLocalTypeOfApplications = createAction(
  ActionTypes.GETLOCALTYPEOFAPPLICATIONS
);

export const getLocalTypeOfApplicationsSuccess = createAction(
  ActionTypes.GETLOCALTYPEOFAPPLICATIONSSUCCESS,
  props<{ applications: Array<TypeOfApplication> }>()
);

export const getEstablishmentTypeOfApplications = createAction(
  ActionTypes.GETESTABLISHMENTTYPEOFAPPLICATIONS
);

export const getEstablishmentTypeOfApplicationsSuccess = createAction(
  ActionTypes.GETESTABLISHMENTTYPEOFAPPLICATIONSSUCCESS,
  props<{ applications: Array<TypeOfApplication> }>()
);

export const typeOfApplicationSuccess = createAction(
  ActionTypes.TYPEOFAPPLICATIONSUCCESS,
  props<{ data: VMSuccess }>()
);

export const typeOfApplicationFailure = createAction(
  ActionTypes.TYPEOFAPPLICATIONFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearTypeOfApplication = createAction(
  ActionTypes.CLEARTYPEOFAPPLICATION
);
