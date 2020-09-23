import { LocalResponse } from '@shared/models/local/local.class';
import { ILocalBusinessForm, ILocalInformationForm, ILocalStatusForm } from '@shared/models/local/local.interface';
import { Plan } from '@shared/models/plan/plan.class';

// tslint:disable-next-line: interface-name
export interface State {
  // local
  local: LocalResponse | null;
  // local information
  localInformationForm: ILocalInformationForm;
  // local status
  localStatusForm: ILocalStatusForm;
  // local status
  localBusinessForm: ILocalBusinessForm;
  // plan for Local
  plan: Plan | null;
  // isLoadingPlan loading for get plan
  isLoadingGetPlan: boolean;
  // isLoadingPlan loading for get plan
  isLoadingUpdatePlan: boolean;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Local
  isLoadingGetLocal: boolean;
  // load while send request for Update Local
  isLoadingUpdateLocal: boolean;
  // load while send request for Update Status
  isLoadingUpdateLocalStatus: boolean;
  // load while send request for Update Local Business
  isLoadingUpdateLocalBusiness: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  local: null,
  localInformationForm: null,
  localStatusForm: null,
  localBusinessForm: null,
  plan: null,
  isLoadingGetPlan: false,
  isLoadingUpdatePlan: false,
  error: null,
  success: null,
  isLoadingGetLocal: false,
  isLoadingUpdateLocal: false,
  isLoadingUpdateLocalStatus: false,
  isLoadingUpdateLocalBusiness: false,
  isLoadingGeneral: false
};
