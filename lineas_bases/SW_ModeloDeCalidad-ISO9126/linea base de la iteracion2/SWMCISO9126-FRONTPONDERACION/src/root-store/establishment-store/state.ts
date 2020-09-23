import { LocalEstablishment, LocalEstablishmentResponse } from '@shared/models/local-establishment/local-establishment.class';
import { ILocalEstablishmentInformationForm, ILocalEstablishmentStatusForm } from '@shared/models/local-establishment/local-establishment.interface';

// tslint:disable-next-line: interface-name
export interface State {
  // currentEstablshment select
  establishment: LocalEstablishment | null;
  // establishment Information select
  establishmentGeneralInformation: LocalEstablishmentResponse | null;
  // establishment form select
  establishmentInformationForm: ILocalEstablishmentInformationForm | null;
  // establishment status form
  establishmentStatusForm: ILocalEstablishmentStatusForm | null;
  // establishment by user
  establishments: null | Array<LocalEstablishment>;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model select: open -> true, close -> false
  modalSelect: boolean;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Establishments
  isLoadingGetEstablishments: boolean;
  // load while send request for Get Establishments
  isLoadingGetEstablishmentGeneralInformation: boolean;
  // load while send request for Establishment Create
  isLoadingCreate: boolean;
  // load while send request for Establishment Update
  isLoadingUpdateEstablishmentForm: boolean;
  // load while send request for Establishment Status
  isLoadingUpdateEstablishmentStatus: boolean;
  // load general
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  establishment: null,
  establishmentGeneralInformation: null,
  establishmentInformationForm: null,
  establishmentStatusForm: null,
  establishments: null,
  modalCreate: false,
  modalSelect: false,
  error: null,
  success: null,
  isLoadingGetEstablishments: false,
  isLoadingGetEstablishmentGeneralInformation: false,
  isLoadingCreate: false,
  isLoadingUpdateEstablishmentForm: false,
  isLoadingUpdateEstablishmentStatus: false,
  isLoadingGeneral: false
};
