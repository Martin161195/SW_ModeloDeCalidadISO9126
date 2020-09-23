import { _chunck } from '@core/common/helpers-array';
import { Action, createReducer, on } from '@ngrx/store';
import { Service } from '@shared/models/service/service.class';
import * as ServiceStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(ServiceStoreActions.getServices, (state: State, { query }) => ({
    ...state,
    isLoadingGetServices: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(ServiceStoreActions.getServicesSuccess, (state: State, { services }) => ({
    ...state,
    isLoadingGetServices: false,
    isLoadingGeneral: false,
    currentPage: services.page,
    itemsPerPage: services.perPage,
    totalRecords: services.totalRecords,
    services: services.data
  })),
  on(ServiceStoreActions.getServicesOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetServices: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(ServiceStoreActions.getServicesOffSuccess, (state: State, { services }) => ({
    ...state,
    isLoadingGetServices: false,
    isLoadingGeneral: false,
    currentPage: services.page,
    itemsPerPage: services.perPage,
    totalRecords: services.totalRecords,
    services: services.data
  })),
  on(ServiceStoreActions.getServicesAll, (state: State) => ({
    ...state,
    isLoadingGetServicesAll: true,
    isLoadingGeneral: true
  })),
  on(ServiceStoreActions.getServicesAllSuccess, (state: State, { services }) => ({
    ...state,
    isLoadingGetServicesAll: false,
    isLoadingGeneral: false,
    servicesAll: services.data
  })),
  on(ServiceStoreActions.getServicesAllClear, (state: State) => ({
    ...state,
    isLoadingGetServicesAll: false,
    isLoadingGeneral: false,
    servicesAll: null
  })),
  on(ServiceStoreActions.getServicesAllOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetServicesAll: true,
    isLoadingGeneral: true,
    query: { ...query }
  })),
  on(ServiceStoreActions.getServicesAllOffSuccess, (state: State, { services }) => {
    let newServices = [];
    const servicesBuff = _chunck(services.data, services.perPage);
    if (servicesBuff.length >= services.page && services.page > 0) {
      newServices = servicesBuff[services.page - 1];
    }

    return {
      ...state,
      isLoadingGetServicesAll: false,
      isLoadingGeneral: false,
      servicesAll: services.data,
      currentPage: services.page,
      itemsPerPage: services.perPage,
      totalRecords: services.totalRecords,
      services: newServices
    };
  }),
  on(ServiceStoreActions.getServiceAppointmentHistory, (state: State) => ({
    ...state,
    isLoadingGetAppointmentHistoryService: true,
    isLoadingGeneral: true
  })),
  on(ServiceStoreActions.getServiceAppointmentHistorySuccess, (state: State,  { history }) => ({
    ...state,
    isLoadingGetAppointmentHistoryService: false,
    isLoadingGeneral: false,
    serviceAppointmentHistory: history
  })),
  on(ServiceStoreActions.createService, (state: State) => ({
    ...state,
    isLoadingCreateService: true,
    isLoadingGeneral: true
  })),
  on(ServiceStoreActions.createServiceSuccess, (state: State) => ({
    ...state,
    isLoadingCreateService: false,
    isLoadingGeneral: false
  })),
  on(ServiceStoreActions.deleteService, (state: State) => ({
    ...state,
    isLoadingDeleteService: true,
    isLoadingGeneral: true
  })),
  on(ServiceStoreActions.deleteServiceSuccess, (state: State) => ({
    ...state,
    isLoadingDeleteService: false,
    isLoadingGeneral: false
  })),
  on(ServiceStoreActions.updateService, (state: State) => ({
    ...state,
    isLoadingUpdateService: true,
    isLoadingGeneral: true
  })),
  on(ServiceStoreActions.updateServiceSuccess, (state: State, { service }) => {
    let buff = null;
    let buffAll = null;
    if (Array.isArray(state.services)) {
      const index = state.services.findIndex((s: Service) => s.id === service.id);
      buff = [...state.services];
      if (index !== -1) {
        buff = [...buff.slice(0, index), service, ...buff.slice(index + 1)];
      }
    }
    if (Array.isArray(state.servicesAll)) {
      const indexAll = state.servicesAll.findIndex((s: Service) => s.id === service.id);
      buffAll = [...state.servicesAll];
      if (indexAll !== -1) {
        buffAll = [...buffAll.slice(0, indexAll), service, ...buffAll.slice(indexAll + 1)];
      }
    }

    return {
      ...state,
      services: buff,
      servicesAll: buffAll,
      isLoadingUpdateService: false,
      isLoadingGeneral: false
    };
  }),
  on(ServiceStoreActions.getCategories, (state: State) => ({
    ...state,
    isLoadingGetCategories: true,
    isLoadingGeneral: true
  })),
  on(ServiceStoreActions.getCategoriesSuccess, (state: State, { categories }) => ({
    ...state,
    isLoadingGetCategories: false,
    isLoadingGeneral: false,
    categories
  })),
  on(ServiceStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(ServiceStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(ServiceStoreActions.modalDetailOpen, (state: State, { service }) => ({
    ...state,
    modalDetail: true,
    serviceForDetail: service
  })),
  on(ServiceStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    serviceForDetail: null
  })),
  on(ServiceStoreActions.modalEditOpen, (state: State, { service }) => ({
    ...state,
    modalEdit: true,
    serviceForEdit: service
  })),
  on(ServiceStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    serviceForEdit: null
  })),
  on(ServiceStoreActions.modalHistoryOpen, (state: State, { service }) => ({
    ...state,
    modalHistory: true,
    serviceForHistory: service
  })),
  on(ServiceStoreActions.modalHistoryClose, (state: State) => ({
    ...state,
    modalHistory: false,
    serviceForHistory: null,
    serviceAppointmentHistory: null
  })),
  on(ServiceStoreActions.alertDeleteOpen, (state: State, { service }) => ({
    ...state,
    alertDelete: true,
    serviceForDelete: service
  })),
  on(ServiceStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    serviceForDelete: null
  })),
  on(ServiceStoreActions.serviceFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(ServiceStoreActions.serviceSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(ServiceStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(ServiceStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(ServiceStoreActions.clearService, (state: State) => ({
    services: null,
    servicesAll: null,
    itemsPerPage: null,
    currentPage: null,
    totalRecords: null,
    query: null,
    categories: null,
    modalCreate: false,
    modalDetail: false,
    modalEdit: false,
    modalHistory: false,
    alertDelete: false,
    serviceForEdit: null,
    serviceForDetail: null,
    serviceForDelete: null,
    serviceForHistory: null,
    serviceAppointmentHistory: null,
    error: null,
    success: null,
    isLoadingGetServices: false,
    isLoadingGetServicesAll: false,
    isLoadingGetCategories: false,
    isLoadingGetAppointmentHistoryService: false,
    isLoadingCreateService: false,
    isLoadingUpdateService: false,
    isLoadingDeleteService: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function serviceReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
