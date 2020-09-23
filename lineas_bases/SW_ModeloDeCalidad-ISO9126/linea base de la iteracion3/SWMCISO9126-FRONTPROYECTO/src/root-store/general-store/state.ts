import { IMenuSidebar } from '@shared/common/interfaces/menu-sidebar.interface';
import { DocumentType } from '@shared/models/document-type/document-type.class';
import { Plan } from '@shared/models/plan/plan.class';
import { VMAlert } from '@shared/models/vmalert/vm-alert.class';

// tslint:disable-next-line: interface-name
export interface State {
  // sidebarDesktop -> true: open, false: close
  sidebarDesktop: boolean;
  // clickRefresh
  clickButtonRefresh: boolean;
  // menuSidebar
  menuSidebar: Array<IMenuSidebar> | null;
  // documentTypes
  documentTypes: Array<DocumentType> | null;
  // planes
  planes: Array<Plan> | null;
  // alert plan
  alertPlan: VMAlert | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Document Types
  isLoadingGetDocumentTypes: boolean;
  // load while send request for Get Document Types
  isLoadingGetPlanes: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  sidebarDesktop: true,
  clickButtonRefresh: false,
  menuSidebar: null,
  documentTypes: null,
  planes: null,
  alertPlan: null,
  error: null,
  success: null,
  isLoadingGetDocumentTypes: false,
  isLoadingGetPlanes: false,
  isLoadingGeneral: false
};
