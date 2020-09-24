import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createAction, props } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Category } from '@shared/models/category/category.class';
import { Service, ServiceWithPagination } from '@shared/models/service/service.class';
import { IServiceCreateRequestOrEdit } from '@shared/models/service/service.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETSERVICES = '[SERVICE] Get Services',
  GETSERVICESSUCCESS = '[SERVICE] Get Services Success',
  GETSERVICESOFF = '[SERVICE] Get Services Off',
  GETSERVICESOFFSUCCESS = '[SERVICE] Get Services Off Success',
  GETSERVICESALL = '[SERVICE] Get Services All',
  GETSERVICESALLSUCCESS = '[SERVICE] Get Services All Success',
  GETSERVICESALLCLEAR = '[SERVICE] Get Services All Clear',
  GETSERVICESALLOFF = '[SERVICE] Get Services All Off',
  GETSERVICESALLOFFSUCCESS = '[SERVICE] Get Services All Off Success',
  GETCATEGORIES = '[SERVICE] Get Categories',
  GETCATEGORIESSUCCESS = '[SERVICE] Get Categories Success',
  GETSERVICEAPPOINTMENTHISTORY = '[SERVICE] Get Service Appointment History',
  GETSERVICEAPPOINTMENTHISTORYSUCCESS = '[SERVICE] Get Service Appointment History Success',
  CREATESERVICE = '[SERVICE] Create Service',
  CREATESERVICESUCCESS = '[SERVICE] Create Service Success',
  UPDATESERVICE = '[SERVICE] Update Service',
  UPDATESERVICESUCCESS = '[SERVICE] Update Service Success',
  DELETESERVICE = '[SERVICE] Delete Service',
  DELETESERVICESUCCESS = '[SERVICE] Delete Service Success',
  // Events for modal
  MODALCREATEOPEN = '[SERVICE] Modal Create Open',
  MODALCREATECLOSE = '[SERVICE] Modal Create Close',
  MODALDETAILOPEN = '[SERVICE] Modal Detail Open',
  MODALDETAILCLOSE = '[SERVICE] Modal Detail Close',
  MODALEDITOPEN = '[SERVICE] Modal Edit Open',
  MODALEDITCLOSE = '[SERVICE] Modal Edit Close',
  MODALHISTORYOPEN = '[SERVICE] Modal History Open',
  MODALHISTORYCLOSE = '[SERVICE] Modal History Close',
  ALERTDELETEOPEN = '[SERVICE] Alert Delete Open',
  ALERTDELETECLOSE = '[SERVICE] Alert Delete Close',
  // Error global service
  SERVICESUCCESS = '[SERVICE] Service Success',
  SERVICEFAILURE = '[SERVICE] Service Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[SERVICE] Error To Null',
  SUCCESSTONULL = '[SERVICE] Success To Null',
  // Clear state
  CLEARSERVICE = '[SERVICE] Clear Service'
}

export const getServices = createAction(
  ActionTypes.GETSERVICES,
  props<{ query: IPagination }>()
);

export const getServicesSuccess = createAction(
  ActionTypes.GETSERVICESSUCCESS,
  props<{ services: ServiceWithPagination }>()
);

export const getServicesOff = createAction(
  ActionTypes.GETSERVICESOFF,
  props<{ query: IPagination }>()
);

export const getServicesOffSuccess = createAction(
  ActionTypes.GETSERVICESOFFSUCCESS,
  props<{ services: ServiceWithPagination }>()
);

export const getServicesAll = createAction(
  ActionTypes.GETSERVICESALL
);

export const getServicesAllSuccess = createAction(
  ActionTypes.GETSERVICESALLSUCCESS,
  props<{ services: ServiceWithPagination }>()
);

export const getServicesAllOff = createAction(
  ActionTypes.GETSERVICESALLOFF,
  props<{ query: IPagination }>()
);

export const getServicesAllOffSuccess = createAction(
  ActionTypes.GETSERVICESALLOFFSUCCESS,
  props<{ services: ServiceWithPagination }>()
);

export const getServicesAllClear = createAction(
  ActionTypes.GETSERVICESALLCLEAR
);

export const getCategories = createAction(
  ActionTypes.GETCATEGORIES
);

export const getCategoriesSuccess = createAction(
  ActionTypes.GETCATEGORIESSUCCESS,
  props<{ categories: Array<Category> }>()
);

export const getServiceAppointmentHistory = createAction(
  ActionTypes.GETSERVICEAPPOINTMENTHISTORY,
  props<{ service: Service }>()
);

export const getServiceAppointmentHistorySuccess = createAction(
  ActionTypes.GETSERVICEAPPOINTMENTHISTORYSUCCESS,
  props<{ history: Array<Appointment> }>()
);

export const createService = createAction(
  ActionTypes.CREATESERVICE,
  props<{ newService: IServiceCreateRequestOrEdit }>()
);

export const createServiceSuccess = createAction(
  ActionTypes.CREATESERVICESUCCESS,
  props<{ service: Service }>()
);

export const updateService = createAction(
  ActionTypes.UPDATESERVICE,
  props<{ newService: IServiceCreateRequestOrEdit }>()
);

export const updateServiceSuccess = createAction(
  ActionTypes.UPDATESERVICESUCCESS,
  props<{ service: Service }>()
);

export const deleteService = createAction(
  ActionTypes.DELETESERVICE
);

export const deleteServiceSuccess = createAction(
  ActionTypes.DELETESERVICESUCCESS,
  props<{ data: VMDelete }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ service: Service }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ service: Service }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const modalHistoryOpen = createAction(
  ActionTypes.MODALHISTORYOPEN,
  props<{ service: Service }>()
);

export const modalHistoryClose = createAction(
  ActionTypes.MODALHISTORYCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ service: Service }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const serviceSuccess = createAction(
  ActionTypes.SERVICESUCCESS,
  props<{ data: VMSuccess }>()
);

export const serviceFailure = createAction(
  ActionTypes.SERVICEFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearService = createAction(
  ActionTypes.CLEARSERVICE
);
