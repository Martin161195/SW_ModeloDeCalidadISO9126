import { Action, createReducer, on } from '@ngrx/store';
import * as EstablishmentStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(EstablishmentStoreActions.getEstablishments, (state: State) => ({
    ...state,
    isLoadingGetEstablishments: true,
    isLoadingGeneral: true
  })),
  on(EstablishmentStoreActions.getEstablishmentsSuccess, (state: State, { establishments }) => ({
    ...state,
    isLoadingGetEstablishments: false,
    isLoadingGeneral: false,
    establishments
  })),
  on(EstablishmentStoreActions.getEstablishmentGeneralInformation, (state: State) => ({
    ...state,
    isLoadingGetEstablishmentGeneralInformation: true,
    isLoadingGeneral: true
  })),
  on(EstablishmentStoreActions.getEstablishmentGeneralInformationSuccess, (state: State, { establishment }) => ({
    ...state,
    isLoadingGetEstablishmentGeneralInformation: false,
    isLoadingGeneral: false,
    establishmentGeneralInformation: { ...establishment },
    establishmentInformationForm: {
      name: establishment.generalInformation.name,
      username: establishment.generalInformation.username,
      cellPhone: establishment.generalInformation.cellPhone,
      phone: establishment.generalInformation.phone,
      description: establishment.generalInformation.description,
      imageProfile: establishment.generalInformation.imageProfile,
      images: establishment.generalInformation.images,
      latitude: establishment.generalInformation.latitude,
      longitude: establishment.generalInformation.longitude,
      contactEmail: establishment.generalInformation.contactEmail,
      address: establishment.generalInformation.address
    },
    establishmentStatusForm: {
      enabledMultisede: establishment.generalInformation.enabledMultisede,
      visible: establishment.generalInformation.visible,
      status: establishment.generalInformation.status,
      applications: establishment.applications
    }
  })),
  on(EstablishmentStoreActions.createEstablishment, (state: State) => ({
    ...state,
    isLoadingCreate: true,
    isLoadingGeneral: true
  })),
  on(EstablishmentStoreActions.createEstablishmentSuccess, (state: State, { establishment }) => {
    let establishments = state.establishments;
    let oldEstablishment = state.establishment;
    establishments = establishments.concat([establishment]);
    if (!oldEstablishment) {
      oldEstablishment = establishment;
      localStorage.setItem('establishmentId', btoa(JSON.stringify(oldEstablishment.id)));
    }

    return {
      ...state,
      isLoadingCreate: false,
      isLoadingGeneral: false,
      establishments,
      establishment: oldEstablishment
    };
  }),
  on(EstablishmentStoreActions.updateEstablishmentInformation, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentForm: true,
    isLoadingGeneral: true
  })),
  on(EstablishmentStoreActions.updateEstablishmentInformationSuccess, (state: State, { establishment }) => ({
    ...state,
    isLoadingUpdateEstablishmentForm: false,
    isLoadingGeneral: false,
    establishment: { ...establishment },
    establishmentInformationForm: {
      name: establishment.name,
      username: establishment.username,
      cellPhone: establishment.cellPhone,
      phone: establishment.phone,
      description: establishment.description,
      imageProfile: establishment.imageProfile,
      images: establishment.images,
      latitude: establishment.latitude,
      longitude: establishment.longitude,
      contactEmail: establishment.contactEmail,
      address: establishment.address
    }
  })),
  on(EstablishmentStoreActions.updateEstablishmentStatus, (state: State) => ({
    ...state,
    isLoadingUpdateEstablishmentStatus: true,
    isLoadingGeneral: true
  })),
  on(EstablishmentStoreActions.updateEstablishmentStatusSuccess, (state: State, { establishment }) => ({
    ...state,
    isLoadingUpdateEstablishmentStatus: false,
    isLoadingGeneral: false,
    establishment: { ...establishment.generalInformation },
    establishmentGeneralInformation: { ...establishment },
    establishmentStatusForm: {
      enabledMultisede: establishment.generalInformation.enabledMultisede,
      visible: establishment.generalInformation.visible,
      status: establishment.generalInformation.status,
      applications: establishment.applications
    }
  })),
  on(EstablishmentStoreActions.setEstablishment, (state: State, { establishment }) => ({
    ...state,
    establishment
  })),
  on(EstablishmentStoreActions.openModalCreate, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(EstablishmentStoreActions.closeModalCreate, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(EstablishmentStoreActions.openModalSelect, (state: State) => ({
    ...state,
    modalSelect: true
  })),
  on(EstablishmentStoreActions.closeModalSelect, (state: State) => ({
    ...state,
    modalSelect: false
  })),
  on(EstablishmentStoreActions.clearEstablishment, (state: State) => ({
    establishments: null,
    establishmentGeneralInformation: null,
    establishmentInformationForm: null,
    establishmentStatusForm: null,
    establishment: null,
    modalCreate: false,
    modalSelect: false,
    isLoadingCreate: false,
    isLoadingGetEstablishments: false,
    isLoadingGetEstablishmentGeneralInformation: false,
    isLoadingUpdateEstablishmentForm: false,
    isLoadingUpdateEstablishmentStatus: false,
    isLoadingGeneral: false,
    error: null,
    success: null
  })),
  on(EstablishmentStoreActions.clearEstablishmentGeneralInformation, (state: State) => ({
    ...state,
    establishmentGeneralInformation: null,
    establishmentInformationForm: null,
    establishmentStatusForm: null,
    isLoadingGetEstablishmentGeneralInformation: false,
    isLoadingUpdateEstablishmentForm: false,
    isLoadingUpdateEstablishmentStatus: false,
    isLoadingGeneral: false,
    error: null,
    success: null
  })),
  on(EstablishmentStoreActions.establishmentFailure, (state: State, { data }) => ({
    ...state,
    isLoadingCreate: false,
    isLoadingGetEstablishments: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(EstablishmentStoreActions.establishmentSuccess, (state: State, { data }) => ({
    ...state,
    isLoadingCreate: false,
    isLoadingGeneral: false,
    success: data.message
  })),
  on(EstablishmentStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(EstablishmentStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function establishmentReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
