import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Promotion } from '@shared/models/promotion/promotion.class';
import { State } from './state';

const getError = (state: State): string | null => state.error;

const getSuccess = (state: State): string | null => state.success;

const getIsLoadingGetPromotions = (state: State): boolean => state.isLoadingGetPromotions;

const getIsLoadingGetPromotionsAll = (state: State): boolean => state.isLoadingGetPromotionsAll;

const getIsLoadingGetUserPromotionByCode = (state: State): boolean => state.isLoadingGetUserPromotionByCode;

const getIsLoadingCreatePromotion = (state: State): boolean => state.isLoadingCreatePromotion;

const getIsLoadingUpdatePromotion = (state: State): boolean => state.isLoadingUpdatePromotion;

const getIsLoadingDeletePromotion = (state: State): boolean => state.isLoadingDeletePromotion;

const getIsLoadingGeneral = (state: State): boolean => state.isLoadingGeneral;

const getPromotions = (state: State): Array<Promotion> | null => state.promotions;

const getPromotionsAll = (state: State): Array<Promotion> | null => state.promotionsAll;

const getUserPromotionByCode = (state: State): Promotion | null => state.userPromotionByCode;

const getPromotionForDelete = (state: State): Promotion | null => state.promotionForDelete;

const getPromotionForDetail = (state: State): Promotion | null => state.promotionForDetail;

const getPromotionForEdit = (state: State): Promotion | null => state.promotionForEdit;

const getItemsPerPage = (state: State): number | null => state.itemsPerPage;

const getCurrentPage = (state: State): number | null => state.currentPage;

const getTotalRecords = (state: State): number | null => state.totalRecords;

const getQuery = (state: State): IPagination => state.query;

const getModalCreate = (state: State): boolean => state.modalCreate;

const getModalDetail = (state: State): boolean => state.modalDetail;

const getModalHistory = (state: State): boolean => state.modalHistory;

const getModalEdit = (state: State): boolean => state.modalEdit;

const getAlertDelete = (state: State): boolean => state.alertDelete;

export const selectPromotionState: MemoizedSelector<object, State> = createFeatureSelector<State>('promotion');

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectPromotionState,
  getError
);

export const selectSuccess: MemoizedSelector<object, string | null> = createSelector(
  selectPromotionState,
  getSuccess
);

export const selectIsLoadingGetPromotions: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingGetPromotions
);

export const selectIsLoadingGetPromotionsAll: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingGetPromotionsAll
);

export const selectIsLoadingUserPromotionByCode: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingGetUserPromotionByCode
);

export const selectIsLoadingCreatePromotion: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingCreatePromotion
);

export const selectIsLoadingDeletePromotion: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingDeletePromotion
);

export const selectIsLoadingUpdatePromotion: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingUpdatePromotion
);

export const selectIsLoadingGeneral: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getIsLoadingGeneral
);

export const selectPromotions: MemoizedSelector<object, Array<Promotion> | null> = createSelector(
  selectPromotionState,
  getPromotions
);

export const selectPromotionsAll: MemoizedSelector<object, Array<Promotion> | null> = createSelector(
  selectPromotionState,
  getPromotionsAll
);

export const selectUserPromotionByCode: MemoizedSelector<object, Promotion | null> = createSelector(
  selectPromotionState,
  getUserPromotionByCode
);

export const selectPromotionForDelete: MemoizedSelector<object, Promotion | null> = createSelector(
  selectPromotionState,
  getPromotionForDelete
);

export const selectPromotionForDetail: MemoizedSelector<object, Promotion | null> = createSelector(
  selectPromotionState,
  getPromotionForDetail
);

export const selectPromotionForEdit: MemoizedSelector<object, Promotion | null> = createSelector(
  selectPromotionState,
  getPromotionForEdit
);

export const selectItemsPerPage: MemoizedSelector<object, number | number> = createSelector(
  selectPromotionState,
  getItemsPerPage
);

export const selectCurrentPage: MemoizedSelector<object, number | number> = createSelector(
  selectPromotionState,
  getCurrentPage
);

export const selectTotalRecords: MemoizedSelector<object, number | null> = createSelector(
  selectPromotionState,
  getTotalRecords
);

export const selectQuery: MemoizedSelector<object, IPagination> = createSelector(
  selectPromotionState,
  getQuery
);

export const selectModalCreate: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getModalCreate
);

export const selectModalDetail: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getModalDetail
);

export const selectModalHistory: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getModalHistory
);

export const selectModalEdit: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getModalEdit
);

export const selectAlertDelete: MemoizedSelector<object, boolean> = createSelector(
  selectPromotionState,
  getAlertDelete
);
