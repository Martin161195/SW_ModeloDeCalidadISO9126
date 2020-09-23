import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createAction, props } from '@ngrx/store';
import { Promotion, PromotionWithPagination } from '@shared/models/promotion/promotion.class';
import { IPromotionCreate, IPromotionEdit, IUserPromotionByCode } from '@shared/models/promotion/promotion.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';

export enum ActionTypes {
  GETPROMOTIONS = '[PROMOTION] Get Promotions',
  GETPROMOTIONSSUCCESS = '[PROMOTION] Get Promotions Success',
  GETPROMOTIONSOFF = '[PROMOTION] Get Promotions Off',
  GETPROMOTIONSOFFSUCCESS = '[PROMOTION] Get Promotions Off Success',
  GETPROMOTIONSALLOFF = '[PROMOTION] Get Promotions All Off',
  GETPROMOTIONSALLOFFSUCCESS = '[PROMOTION] Get Promotions All Off Success',
  GETUSERPROMOTIONBYCODE = '[PROMOTION] Get User Promotion By Code',
  GETUSERPROMOTIONBYCODESUCCESS = '[PROMOTION] Get User Promotion By Code Success',
  CLEARUSERPROMOTIONBYCODE = '[PROMOTION] Clear User Promotion By Code',
  CREATEPROMOTION = '[PROMOTION] Create Promotion',
  CREATEPROMOTIONSUCCESS = '[PROMOTION] Create Promotion Success',
  UPDATEPROMOTION = '[PROMOTION] Update Promotion',
  UPDATEPROMOTIONSUCCESS = '[PROMOTION] Update Promotion Success',
  DELETEPROMOTION = '[PROMOTION] Delete Promotion',
  DELETEPROMOTIONSUCCESS = '[PROMOTION] Delete Promotion Success',
  // Events for modal
  MODALCREATEOPEN = '[PROMOTION] Modal Create Open',
  MODALCREATECLOSE = '[PROMOTION] Modal Create Close',
  MODALDETAILOPEN = '[PROMOTION] Modal Detail Open',
  MODALDETAILCLOSE = '[PROMOTION] Modal Detail Close',
  MODALHISTORYOPEN = '[PROMOTION] Modal History Open',
  MODALHISTORYCLOSE = '[PROMOTION] Modal History Close',
  MODALEDITOPEN = '[PROMOTION] Modal Edit Open',
  MODALEDITCLOSE = '[PROMOTION] Modal Edit Close',
  ALERTDELETEOPEN = '[PROMOTION] Alert Delete Open',
  ALERTDELETECLOSE = '[PROMOTION] Alert Delete Close',
  // Error global promotion
  PROMOTIONSUCCESS = '[PROMOTION] Promotion Success',
  PROMOTIONFAILURE = '[PROMOTION] Promotion Failure',
  // SET ERROR AND SUCCESS MESSAGE TO NULL AFTER DISPLAYS
  ERRORTONULL = '[PROMOTION] Error To Null',
  SUCCESSTONULL = '[PROMOTION] Success To Null',
  // Clear state
  CLEARPROMOTION = '[PROMOTION] Clear Promotion'
}

export const getPromotions = createAction(
  ActionTypes.GETPROMOTIONS,
  props<{ query: IPagination }>()
);

export const getPromotionsSuccess = createAction(
  ActionTypes.GETPROMOTIONSSUCCESS,
  props<{ promotions: PromotionWithPagination }>()
);

export const getPromotionsOff = createAction(
  ActionTypes.GETPROMOTIONSOFF,
  props<{ query: IPagination }>()
);

export const getPromotionsOffSuccess = createAction(
  ActionTypes.GETPROMOTIONSOFFSUCCESS,
  props<{ promotions: PromotionWithPagination }>()
);

export const getPromotionsAllOff = createAction(
  ActionTypes.GETPROMOTIONSALLOFF,
  props<{ query: IPagination }>()
);

export const getPromotionsAllOffSuccess = createAction(
  ActionTypes.GETPROMOTIONSALLOFFSUCCESS,
  props<{ promotions: PromotionWithPagination }>()
);

export const getUserPromotionByCode = createAction(
  ActionTypes.GETUSERPROMOTIONBYCODE,
  props<{ query: IUserPromotionByCode }>()
);

export const getUserPromotionByCodeSuccess = createAction(
  ActionTypes.GETUSERPROMOTIONBYCODESUCCESS,
  props<{ promotion: Promotion }>()
);

export const clearUserPromotionByCode = createAction(
  ActionTypes.CLEARUSERPROMOTIONBYCODE
);

export const createPromotion = createAction(
  ActionTypes.CREATEPROMOTION,
  props<{ newPromotion: IPromotionCreate }>()
);

export const createPromotionSuccess = createAction(
  ActionTypes.CREATEPROMOTIONSUCCESS,
  props<{ promotion: Promotion }>()
);

export const deletePromotion = createAction(
  ActionTypes.DELETEPROMOTION
);

export const deletePromotionSuccess = createAction(
  ActionTypes.DELETEPROMOTIONSUCCESS,
  props<{ data: VMDelete }>()
);

export const updatePromotion = createAction(
  ActionTypes.UPDATEPROMOTION,
  props<{ newPromotion: IPromotionEdit }>()
);

export const updatePromotionSuccess = createAction(
  ActionTypes.UPDATEPROMOTIONSUCCESS,
  props<{ promotion: Promotion }>()
);

export const modalCreateOpen = createAction(
  ActionTypes.MODALCREATEOPEN
);

export const modalCreateClose = createAction(
  ActionTypes.MODALCREATECLOSE
);

export const modalDetailOpen = createAction(
  ActionTypes.MODALDETAILOPEN,
  props<{ promotion: Promotion }>()
);

export const modalDetailClose = createAction(
  ActionTypes.MODALDETAILCLOSE
);

export const modalHistoryOpen = createAction(
  ActionTypes.MODALHISTORYOPEN,
  props<{ promotion: Promotion }>()
);

export const modalHistoryClose = createAction(
  ActionTypes.MODALHISTORYCLOSE
);

export const modalEditOpen = createAction(
  ActionTypes.MODALEDITOPEN,
  props<{ promotion: Promotion }>()
);

export const modalEditClose = createAction(
  ActionTypes.MODALEDITCLOSE
);

export const alertDeleteOpen = createAction(
  ActionTypes.ALERTDELETEOPEN,
  props<{ promotion: Promotion }>()
);

export const alertDeleteClose = createAction(
  ActionTypes.ALERTDELETECLOSE
);

export const promotionSuccess = createAction(
  ActionTypes.PROMOTIONSUCCESS,
  props<{ data: VMSuccess }>()
);

export const promotionFailure = createAction(
  ActionTypes.PROMOTIONFAILURE,
  props<{ data: VMError }>()
);

export const errorToNull = createAction(
  ActionTypes.ERRORTONULL
);

export const successToNull = createAction(
  ActionTypes.SUCCESSTONULL
);

export const clearPromotion = createAction(
  ActionTypes.CLEARPROMOTION
);
