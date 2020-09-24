import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Promotion } from '@shared/models/promotion/promotion.class';

// tslint:disable-next-line: interface-name
export interface State {
  // userPromotionByCode retrieve from server
  userPromotionByCode: Promotion | null;
  // promotions retrieve from server
  promotions: Array<Promotion> | null;
  // promotionsAll retrieve from server
  promotionsAll: Array<Promotion> | null;
  // number of promotions for view in table
  itemsPerPage: number | null;
  // currentPage
  currentPage: number | null;
  // currentPage
  totalRecords: number | null;
  // order
  query: IPagination | null;
  // State model create: open -> true, close -> false
  modalCreate: boolean;
  // State model create: open -> true, close -> false
  modalDetail: boolean;
  // State model create: open -> true, close -> false
  modalHistory: boolean;
  // State model create: open -> true, close -> false
  modalEdit: boolean;
  // State alert delete: open -> true, close -> false
  alertDelete: boolean;
  // State for promotion edit
  promotionForEdit: Promotion | null;
  // State for promotion delete
  promotionForDelete: Promotion | null;
  // State for promotion detail
  promotionForDetail: Promotion | null;
  // error message
  error: string | null;
  //  success message
  success: string | null;
  // load while send request for Get Promotions
  isLoadingGetPromotions: boolean;
  // load while send request for Get Promotions All
  isLoadingGetPromotionsAll: boolean;
  // load while send request for Get User Promotion by Code
  isLoadingGetUserPromotionByCode: boolean;
  // load while send request for Create Promotion
  isLoadingCreatePromotion: boolean;
  // load while send request for Delete Promotion
  isLoadingDeletePromotion: boolean;
  // load while send request for Update Promotion
  isLoadingUpdatePromotion: boolean;
  // load General
  isLoadingGeneral: boolean;
}

export const initialState: State = {
  userPromotionByCode: null,
  promotions: null,
  promotionsAll: null,
  itemsPerPage: null,
  currentPage: null,
  totalRecords: null,
  query: null,
  modalCreate: false,
  modalDetail: false,
  modalEdit: false,
  modalHistory: false,
  alertDelete: false,
  promotionForEdit: null,
  promotionForDelete: null,
  promotionForDetail: null,
  error: null,
  success: null,
  isLoadingGetPromotions: false,
  isLoadingGetPromotionsAll: false,
  isLoadingGetUserPromotionByCode: false,
  isLoadingCreatePromotion: false,
  isLoadingDeletePromotion: false,
  isLoadingUpdatePromotion: false,
  isLoadingGeneral: false
};
