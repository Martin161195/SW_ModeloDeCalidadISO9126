import { TypeOfApplication } from '@shared/models/type-of-application/type-of-application.class';

// tslint:disable-next-line: interface-name
export interface State {
  // applications
  typeOfApplications: Array<TypeOfApplication> | null;
  // local's applications
  localTypeOfApplications: Array<TypeOfApplication> | null;
  // establishment's applications
  establishmentTypeOfApplications: Array<TypeOfApplication> | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get TypeOfApplications
  isLoadingGetTypeOfApplications: boolean;
  // load while send request for Get Local TypeOfApplications
  isLoadingGetLocalTypeOfApplications: boolean;
  // load while send request for Get Establishment TypeOfApplications
  isLoadingGetEstablishmentTypeOfApplications: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  typeOfApplications: null,
  localTypeOfApplications: null,
  establishmentTypeOfApplications: null,
  error: null,
  success: null,
  isLoadingGetTypeOfApplications: false,
  isLoadingGetLocalTypeOfApplications: false,
  isLoadingGetEstablishmentTypeOfApplications: false,
  isLoadingGeneral: false
};
