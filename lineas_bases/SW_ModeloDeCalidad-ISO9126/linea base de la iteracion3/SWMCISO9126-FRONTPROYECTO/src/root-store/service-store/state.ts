import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Category } from '@shared/models/category/category.class';
import { Service } from '@shared/models/service/service.class';

// tslint:disable-next-line: interface-name
export interface State {
  // services retrieve from server
  services: Array<Service> | null;
  // servicesAll retrieve from server
  servicesAll: Array<Service> | null;
  // number of services for view in table
  itemsPerPage: number | null;
  // currentPage
  currentPage: number | null;
  // currentPage
  totalRecords: number | null;
  // order
  query: IPagination | null;
  // categories
  categories: Array<Category> | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // State model create: open -> true, close -> false
  modalHistory: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // State for service edit
  serviceForEdit: Service | null;
  // State for service delete
  serviceForDelete: Service | null;
  // State for service detail
  serviceForDetail: Service | null;
  // State for service history
  serviceForHistory: Service | null;
  serviceAppointmentHistory: Array<Appointment> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Services
  isLoadingGetServices: boolean;
  // load while send request for Get Services All
  isLoadingGetServicesAll: boolean;
  // load while send request for Get Categories
  isLoadingGetCategories: boolean;
  // load while send request for Appointment history Service
  isLoadingGetAppointmentHistoryService: boolean;
  // load while send request for Create Service
  isLoadingCreateService: boolean;
  // load while send request for Update Service
  isLoadingUpdateService: boolean;
  // load while send request for Delete Service
  isLoadingDeleteService: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
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
  serviceForDelete: null,
  serviceForDetail: null,
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
};
