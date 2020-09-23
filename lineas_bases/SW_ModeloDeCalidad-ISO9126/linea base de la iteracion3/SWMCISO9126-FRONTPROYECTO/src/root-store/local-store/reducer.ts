import { Action, createReducer, on } from '@ngrx/store';
import * as LocalStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(LocalStoreActions.getLocal, (state: State) => ({
    ...state,
    isLoadingGetLocal: true,
    isLoadingGeneral: true
  })),
  on(LocalStoreActions.getLocalSuccess, (state: State, { local }) => ({
    ...state,
    isLoadingGetLocal: false,
    isLoadingGeneral: false,
    local: { ...local },
    localInformationForm: {
      name: local.generalInformation.name,
      username: local.generalInformation.username,
      description: local.generalInformation.description,
      imageProfile: local.generalInformation.imageProfile,
      images: local.generalInformation.images,
      email: local.generalInformation.email,
      cellPhone: local.generalInformation.cellPhone,
      phone: local.generalInformation.phone
    },
    localStatusForm: {
      enabledMultisede: local.generalInformation.enabledMultisede,
      visible: local.generalInformation.visible,
      status: local.generalInformation.status,
      applications: local.applications
    },
    localBusinessForm: {
      businessName: local && local.businessInformation && local.businessInformation.businessName || null,
      rucNumber: local && local.businessInformation && local.businessInformation.rucNumber || null,
      address: local && local.businessInformation && local.businessInformation.address || null,
      firstNameLegal: local && local.businessInformation && local.businessInformation.firstNameLegal || null,
      lastNameLegal: local && local.businessInformation && local.businessInformation.lastNameLegal || null,
      emailLegal: local && local.businessInformation && local.businessInformation.emailLegal || null
    }
  })),
  on(LocalStoreActions.updateLocal, (state: State) => ({
    ...state,
    isLoadingUpdateLocal: true,
    isLoadingGeneral: true
  })),
  on(LocalStoreActions.updateLocalSuccess, (state: State, { local }) => {

    const newLocal = { ...state.local };
    newLocal.generalInformation = { ...local };

    return {
      ...state,
      isLoadingUpdateLocal: false,
      isLoadingGeneral: false,
      local: { ...newLocal },
      localInformationForm: {
        name: local.name,
        username: local.username,
        description: local.description,
        imageProfile: local.imageProfile,
        images: local.images,
        email: local.email,
        cellPhone: local.cellPhone,
        phone: local.phone
      }
    };
  }),
  on(LocalStoreActions.updateLocalStatus, (state: State) => ({
    ...state,
    isLoadingUpdateLocalStatus: true,
    isLoadingGeneral: true
  })),
  on(LocalStoreActions.updateLocalStatusSuccess, (state: State, { local }) => {

    return {
      ...state,
      isLoadingUpdateLocalStatus: false,
      isLoadingGeneral: false,
      local: { ...local },
      localStatusForm: {
        enabledMultisede: local.generalInformation.enabledMultisede,
        visible: local.generalInformation.visible,
        status: local.generalInformation.status,
        applications: local.applications
      }
    };
  }),
  on(LocalStoreActions.updateLocalBusiness, (state: State) => ({
    ...state,
    isLoadingUpdateLocalBusiness: true,
    isLoadingGeneral: true
  })),
  on(LocalStoreActions.updateLocalBusinessSuccess, (state: State, { local }) => {

    const newLocal = { ...state.local };
    newLocal.businessInformation = { ...local };

    return {
      ...state,
      isLoadingUpdateLocalBusiness: false,
      isLoadingGeneral: false,
      local: { ...newLocal },
      localBusinessForm: {
        businessName: local && local.businessName || null,
        rucNumber: local && local.rucNumber || null,
        address: local && local.address || null,
        firstNameLegal: local && local.firstNameLegal || null,
        lastNameLegal: local && local.lastNameLegal || null,
        emailLegal: local && local.emailLegal || null
      }
    };
  }),
  on(LocalStoreActions.setPlan, (state: State, { plan }) => ({
    ...state,
    plan: { ...plan }
  })),
  on(LocalStoreActions.getPlan, (state: State) => ({
    ...state,
    isLoadingGetPlan: true
  })),
  on(LocalStoreActions.getPlanSuccess, (state: State, { plan }) => ({
    ...state,
    isLoadingGetPlan: false,
    plan: { ...plan }
  })),
  on(LocalStoreActions.updatePlan, (state: State) => ({
    ...state,
    isLoadingUpdatePlan: true
  })),
  on(LocalStoreActions.updatePlanSuccess, (state: State, { plan }) => ({
    ...state,
    isLoadingUpdatePlan: false,
    plan: { ...plan }
  })),
  on(LocalStoreActions.localFailure, (state: State, { data }) => ({
    ...state,
    error: data.message
  })),
  on(LocalStoreActions.localSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(LocalStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(LocalStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(LocalStoreActions.clearPlan, (state: State) => ({
    ...state,
    plan: null,
    isLoadingGetPlan: false,
    isLoadingUpdatePlan: false
  })),
  on(LocalStoreActions.clearLocal, (state: State) => ({
    ...state,
    local: null,
    localInformationForm: null,
    localStatusForm: null,
    localBusinessForm: null,
    error: null,
    success: null,
    isLoadingGetLocal: false,
    isLoadingUpdateLocal: false,
    isLoadingUpdateLocalStatus: false,
    isLoadingUpdateLocalBusiness: false,
    isLoadingGeneral: false
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function localReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
