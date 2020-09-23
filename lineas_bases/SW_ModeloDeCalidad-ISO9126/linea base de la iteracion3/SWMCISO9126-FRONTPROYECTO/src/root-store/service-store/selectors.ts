import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Category } from '@shared/models/category/category.class';
import { Service } from '@shared/models/service/service.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetServices = (state: State): boolean => state.isLoadingGetServices;

const getIsLoadingGetServicesAll = (state: State): boolean => state.isLoadingGetServicesAll;

const getIsLoadingCreateService = (state: State): boolean => state.isLoadingCreateService;

const getIsLoadingUpdateService = (state: State): boolean => state.isLoadingUpdateService;

const getIsLoadingDeleteService = (state: State): boolean => state.isLoadingDeleteService;

const getIsLoadingCategories = (state: State): boolean => state.isLoadingGetCategories;

const getIsLoadingGetAppointmentHistoryService = (state: State): boolean => state.isLoadingGetAppointmentHistoryService;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getServices = (state: State): Array<Service> | null => state.services;

const getServicesAll = (state: State): Array<Service> | null => state.servicesAll;

const getServiceForDelete = (state: State): Service | null => state.serviceForDelete;

const getServiceForDetail = (state: State): Service | null => state.serviceForDetail;

const getServiceForEdit = (state: State): Service | null => state.serviceForEdit;

const getServiceForHistory = (state: State): Service | null => state.serviceForHistory;

const getServiceAppointmentHistory = (state: State): Array<Appointment> | null => state.serviceAppointmentHistory;

const getCategories = (state: State): Array<Category> | null => state.categories;

const getItemsPerPage = (state: State): number | null => state.itemsPerPage;

const getCurrentPage = (state: State): number | null => state.currentPage;

const getTotalRecords = (state: State): number | null => state.totalRecords;

const getQuery = (state: State): IPagination => state.query;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getModalHistory = (state: State): boolean => state.modalHistory;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectServiceState: MemoizedSelector<object, State> = createFeatureSelector<State>('service');

export const selectServiceError: MemoizedSelector<object, string | null> = createSelector(
  selectServiceState,
  getError
);

export const selectServiceSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectServiceState,
  getSuccess
);

export const selectServiceIsLoadingGetServices: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingGetServices
);

export const selectServiceIsLoadingGetServicesAll: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingGetServicesAll
);

export const selectServiceIsLoadingCreateService: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingCreateService
);

export const selectServiceIsLoadingUpdateService: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingUpdateService
);

export const selectServiceIsLoadingDeleteService: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingDeleteService
);

export const selectServiceIsLoadingGetCategories: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingCategories
);

export const selectServiceIsLoadingGetAppointmentHistoryService: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingGetAppointmentHistoryService
);

export const selectServiceIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getIsLoadingGeneral
);

export const selectServices: MemoizedSelector<object, Array<Service> | null> = createSelector(
  selectServiceState,
  getServices
);

export const selectServicesAll: MemoizedSelector<object, Array<Service> | null> = createSelector(
  selectServiceState,
  getServicesAll
);

export const selectServiceForDelete: MemoizedSelector<object, Service | null> = createSelector(
  selectServiceState,
  getServiceForDelete
);

export const selectServiceForDetail: MemoizedSelector<object, Service | null> = createSelector(
  selectServiceState,
  getServiceForDetail
);

export const selectServiceForEdit: MemoizedSelector<object, Service | null> = createSelector(
  selectServiceState,
  getServiceForEdit
);

export const selectServiceForHistory: MemoizedSelector<object, Service | null> = createSelector(
  selectServiceState,
  getServiceForHistory
);

export const selectServiceAppointmentHistory: MemoizedSelector<object, Array<Appointment> | null> = createSelector(
  selectServiceState,
  getServiceAppointmentHistory
);

export const selectCategories: MemoizedSelector<object, Array<Category> | null> = createSelector(
  selectServiceState,
  getCategories
);

export const selectServiceItemsPerPage: MemoizedSelector<object, number | number> = createSelector(
  selectServiceState,
  getItemsPerPage
);

export const selectServiceCurrentPage: MemoizedSelector<object, number | number> = createSelector(
  selectServiceState,
  getCurrentPage
);

export const selectServiceTotalRecords: MemoizedSelector<object, number | null> = createSelector(
  selectServiceState,
  getTotalRecords
);

export const selectServiceQuery: MemoizedSelector<object, IPagination> = createSelector(
  selectServiceState,
  getQuery
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getModalDetail
);

export const selectModalHistory: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getModalHistory
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectServiceState,
  getAlertDelete
);
