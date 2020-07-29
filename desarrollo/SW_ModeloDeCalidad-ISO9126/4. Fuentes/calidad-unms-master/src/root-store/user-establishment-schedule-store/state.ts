import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
import { IQueryForGetSchedules } from '@shared/models/user-establishment-schedule/user-establishment-schedule.interface';
import { UserEstablishment } from '@shared/models/user-establishment/user-establishment.class';

// tslint:disable-next-line: interface-name
export interface State {
  // userEstablishment retrieve from server for calendar
  userEstablishment: UserEstablishment | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // QueryForGetSchedules query for get
  queryForGetSchedules: IQueryForGetSchedules | null;
  // State for userEstablishmentSchedules
  userEstablishmentSchedules: Array<UserEstablishmentSchedule> | null;
  // State for userEstablishmentSchedule edit
  userEstablishmentScheduleForEdit: UserEstablishmentSchedule | null;
  // State for userEstablishmentSchedule detail
  userEstablishmentScheduleForDetail: UserEstablishmentSchedule | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get UserEstablishment
  isLoadingGetUserEstablishment: boolean;
  // load while send request for Get UserEstablishmentSchedules
  isLoadingGetUserEstablishmentSchedules: boolean;
  // load while send request for Create UserEstablishmentSchedule
  isLoadingCreateUserEstablishmentSchedule: boolean;
  // load while send request for Update UserEstablishmentSchedule
  isLoadingUpdateUserEstablishmentSchedule: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  userEstablishment: null,
  modalCreate: false,
  modalDetail: false,
  modalEdit: false,
  queryForGetSchedules: null,
  userEstablishmentSchedules: null,
  userEstablishmentScheduleForEdit: null,
  userEstablishmentScheduleForDetail: null,
  error: null,
  success: null,
  isLoadingGetUserEstablishment: false,
  isLoadingGetUserEstablishmentSchedules: false,
  isLoadingCreateUserEstablishmentSchedule: false,
  isLoadingUpdateUserEstablishmentSchedule: false,
  isLoadingGeneral: false
};
