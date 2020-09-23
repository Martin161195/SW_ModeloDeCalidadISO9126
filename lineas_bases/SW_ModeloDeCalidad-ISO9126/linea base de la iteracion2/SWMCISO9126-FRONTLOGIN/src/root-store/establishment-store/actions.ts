import { createAction, props } from '@ngrx/store';
import { LocalEstablishment, LocalEstablishmentResponse } from '@shared/models/local-establishment/local-establishment.class';
import { IEstablishmentStatusEditRequest, ILocalEstablishmentCreateRequest, ILocalEstablishmentInformationForm } from '@shared/models/local-establishment/local-establishment.interface';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETESTABLISHMENTS = '[ESTABLISHMENT] Get Establishments',
  GETESTABLISHMENTSSUCCESS = '[ESTABLISHMENT] Get Establishments Success',
  GETESTABLISHMENTGENERALINFORMATION = '[ESTABLISHMENT] Get Establishment General Information',
  GETESTABLISHMENTGENERALINFORMATIONSUCCESS = '[ESTABLISHMENT] Get Establishment General Information Success',
  CREATEESTABLISHMENT = '[ESTABLISHMENT] Create Establishment',
  CREATEESTABLISHMENTSUCCESS = '[ESTABLISHMENT] Create Establishment Success',
  UPDATEESTABLISHMENTINFORMATION = '[ESTABLISHMENT] Update Establishment Information',
  UPDATEESTABLISHMENTINFORMATIONSUCCESS = '[ESTABLISHMENT] Update Establishment Information Success',
  UPDATEESTABLISHMENTSTATUS = '[ESTABLISHMENT] Update Establishment Status',
  UPDATEESTABLISHMENTSTATUSSUCCESS = '[ESTABLISHMENT] Update Establishment Status Success',
  // Sync Establishments
  SETESTABLISHMENT = '[ESTABLISHMENT] Set Establishment',
  // Events for modal
  OPENMODALCREATE = '[ESTABLISHMENT] Open Modal Create',
  CLOSEMODALCREATE = '[ESTABLISHMENT] Close Modal Create',
  OPENMODALSELECT = '[ESTABLISHMENT] Open Modal Select',
  CLOSEMODALSELECT = '[ESTABLISHMENT] Close Modal Select',
  // Clear Establishments
  CLEARESTABLISHMENT = '[ESTABLISHMENT] Clear Establishment',
  CLEARESTABLISHMENTGENERALINFORMATION = '[ESTABLISHMENT] Clear Establishment General Information',
  // General Error in Establishment
  ESTABLISHMENTFAILURE = '[ESTABLISHMENT] Establishment Failure',
  // General success message in Auth
  ESTABLISHMENTSUCCESS = '[ESTABLISHMENT] Establishment Success',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[ESTABLISHMENT] Error To Null',
  SUCCESSTONULL = '[ESTABLISHMENT] Success To Null'
}

export const getEstablishments = createAction(
  ActionTypes.GETESTABLISHMENTS
);

export const getEstablishmentsSuccess = createAction(
  ActionTypes.GETESTABLISHMENTSSUCCESS,
  props<{ establishments: Array<LocalEstablishment> }>()
);

export const getEstablishmentGeneralInformation = createAction(
  ActionTypes.GETESTABLISHMENTGENERALINFORMATION
);

export const getEstablishmentGeneralInformationSuccess = createAction(
  ActionTypes.GETESTABLISHMENTGENERALINFORMATIONSUCCESS,
  props<{ establishment: LocalEstablishmentResponse }>()
);

export const createEstablishment = createAction(
  ActionTypes.CREATEESTABLISHMENT,
  props<{ newEstablishment: ILocalEstablishmentCreateRequest }>()
);

export const createEstablishmentSuccess = createAction(
  ActionTypes.CREATEESTABLISHMENTSUCCESS,
  props<{ establishment: LocalEstablishment }>()
);

export const updateEstablishmentInformation = createAction(
  ActionTypes.UPDATEESTABLISHMENTINFORMATION,
  props<{ newEstablishment: ILocalEstablishmentInformationForm }>()
);

export const updateEstablishmentInformationSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTINFORMATIONSUCCESS,
  props<{ establishment: LocalEstablishment }>()
);

export const updateEstablishmentStatus = createAction(
  ActionTypes.UPDATEESTABLISHMENTSTATUS,
  props<{ newStatus: IEstablishmentStatusEditRequest }>()
);

export const updateEstablishmentStatusSuccess = createAction(
  ActionTypes.UPDATEESTABLISHMENTSTATUSSUCCESS,
  props<{ establishment: LocalEstablishmentResponse }>()
);

export const setEstablishment = createAction(
  ActionTypes.SETESTABLISHMENT,
  props<{ establishment: LocalEstablishment }>()
);

export const openModalCreate = createAction(
  ActionTypes.OPENMODALCREATE
);

export const closeModalCreate = createAction(
  ActionTypes.CLOSEMODALCREATE
);

export const openModalSelect = createAction(
  ActionTypes.OPENMODALSELECT
);

export const closeModalSelect = createAction(
  ActionTypes.CLOSEMODALSELECT
);

export const clearEstablishment = createAction(
  ActionTypes.CLEARESTABLISHMENT
);

export const clearEstablishmentGeneralInformation = createAction(
  ActionTypes.CLEARESTABLISHMENTGENERALINFORMATION
);

export const establishmentFailure = createAction(
  ActionTypes.ESTABLISHMENTFAILURE,
  props<{ data: VMError }>()
);

export const establishmentSuccess = createAction(
  ActionTypes.ESTABLISHMENTSUCCESS,
  props<{ data: VMSuccess }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);
