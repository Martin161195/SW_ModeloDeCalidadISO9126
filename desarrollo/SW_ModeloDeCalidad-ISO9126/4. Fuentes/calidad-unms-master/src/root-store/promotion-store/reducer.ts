import { _chunck } from '@core/common/helpers-array';
import { Action, createReducer, on } from '@ngrx/store';
import { Promotion } from '@shared/models/promotion/promotion.class';
import * as PromotionStoreActions from './actions';
import { initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(PromotionStoreActions.getPromotions, (state: State, { query }) => ({
    ...state,
    isLoadingGetPromotions: true,
    isLoadingGeneral: true,
    query
  })),
  on(PromotionStoreActions.getPromotionsSuccess, (state: State, { promotions }) => ({
    ...state,
    isLoadingGetPromotions: false,
    isLoadingGeneral: false,
    currentPage: promotions.page,
    itemsPerPage: promotions.perPage,
    totalRecords: promotions.totalRecords,
    promotions: promotions.data
  })),
  on(PromotionStoreActions.getPromotionsOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetPromotions: true,
    isLoadingGeneral: true,
    query
  })),
  on(PromotionStoreActions.getPromotionsOffSuccess, (state: State, { promotions }) => ({
    ...state,
    isLoadingGetPromotions: false,
    isLoadingGeneral: false,
    currentPage: promotions.page,
    itemsPerPage: promotions.perPage,
    totalRecords: promotions.totalRecords,
    promotions: promotions.data
  })),
  on(PromotionStoreActions.getPromotionsAllOff, (state: State, { query }) => ({
    ...state,
    isLoadingGetPromotionsAll: true,
    isLoadingGeneral: true,
    query
  })),
  on(PromotionStoreActions.getPromotionsAllOffSuccess, (state: State, { promotions }) => {
    let newPromotions = [];
    const promotionsBuff = _chunck(promotions.data, promotions.perPage);
    if (promotionsBuff.length >= promotions.page && promotions.page > 0) {
      newPromotions = promotionsBuff[promotions.page - 1];
    }

    return {
      ...state,
      isLoadingGetPromotionsAll: false,
      isLoadingGeneral: false,
      promotionsAll: promotions.data,
      currentPage: promotions.page,
      itemsPerPage: promotions.perPage,
      totalRecords: promotions.totalRecords,
      promotions: newPromotions
    };
  }),
  on(PromotionStoreActions.getUserPromotionByCode, (state: State) => ({
    ...state,
    isLoadingGetUserPromotionByCode: true,
    isLoadingGeneral: true
  })),
  on(PromotionStoreActions.getUserPromotionByCodeSuccess, (state: State, { promotion }) => ({
    ...state,
    isLoadingGetUserPromotionByCode: false,
    isLoadingGeneral: false,
    userPromotionByCode: promotion
  })),
  on(PromotionStoreActions.clearUserPromotionByCode, (state: State) => ({
    ...state,
    isLoadingGetUserPromotionByCode: false,
    isLoadingGeneral: false,
    userPromotionByCode: null
  })),
  on(PromotionStoreActions.createPromotion, (state: State) => ({
    ...state,
    isLoadingCreatePromotion: true,
    isLoadingGeneral: true
  })),
  on(PromotionStoreActions.createPromotionSuccess, (state: State) => ({
    ...state,
    isLoadingCreatePromotion: false,
    isLoadingGeneral: false
  })),
  on(PromotionStoreActions.deletePromotion, (state: State) => ({
    ...state,
    isLoadingDeletePromotion: true,
    isLoadingGeneral: true
  })),
  on(PromotionStoreActions.deletePromotionSuccess, (state: State) => ({
    ...state,
    isLoadingDeletePromotion: false,
    isLoadingGeneral: false
  })),
  on(PromotionStoreActions.updatePromotion, (state: State) => ({
    ...state,
    isLoadingUpdatePromotion: true,
    isLoadingGeneral: true
  })),
  on(PromotionStoreActions.updatePromotionSuccess, (state: State, { promotion }) => {
    let buff = null;
    let buffAll = null;
    if (Array.isArray(state.promotions)) {
      const index = state.promotions.findIndex((s: Promotion) => s.id === promotion.id);
      buff = [...state.promotions];
      if (index !== -1) {
        buff = [...buff.slice(0, index), promotion, ...buff.slice(index + 1)];
      }
    }
    if (Array.isArray(state.promotionsAll)) {
      const indexAll = state.promotionsAll.findIndex((s: Promotion) => s.id === promotion.id);
      buffAll = [...state.promotionsAll];
      if (indexAll !== -1) {
        buffAll = [...buffAll.slice(0, indexAll), promotion, ...buffAll.slice(indexAll + 1)];
      }
    }

    return {
      ...state,
      promotions: buff,
      promotionsAll: buffAll,
      isLoadingUpdatePromotion: false,
      isLoadingGeneral: false
    };
  }),
  on(PromotionStoreActions.modalCreateOpen, (state: State) => ({
    ...state,
    modalCreate: true
  })),
  on(PromotionStoreActions.modalCreateClose, (state: State) => ({
    ...state,
    modalCreate: false
  })),
  on(PromotionStoreActions.modalDetailOpen, (state: State, { promotion }) => ({
    ...state,
    modalDetail: true,
    promotionForDetail: promotion
  })),
  on(PromotionStoreActions.modalDetailClose, (state: State) => ({
    ...state,
    modalDetail: false,
    promotionForDetail: null
  })),
  on(PromotionStoreActions.modalHistoryOpen, (state: State, { promotion }) => ({
    ...state,
    modalHistory: true,
    promotionForDetail: promotion
  })),
  on(PromotionStoreActions.modalHistoryClose, (state: State) => ({
    ...state,
    modalHistory: false,
    promotionForDetail: null
  })),
  on(PromotionStoreActions.modalEditOpen, (state: State, { promotion }) => ({
    ...state,
    modalEdit: true,
    promotionForEdit: promotion
  })),
  on(PromotionStoreActions.modalEditClose, (state: State) => ({
    ...state,
    modalEdit: false,
    promotionForEdit: null
  })),
  on(PromotionStoreActions.alertDeleteOpen, (state: State, { promotion }) => ({
    ...state,
    alertDelete: true,
    promotionForDelete: promotion
  })),
  on(PromotionStoreActions.alertDeleteClose, (state: State) => ({
    ...state,
    alertDelete: false,
    promotionForDelete: null
  })),
  on(PromotionStoreActions.promotionFailure, (state: State, { data }) => ({
    ...state,
    isLoadingGetPromotions: false,
    isLoadingCreatePromotion: false,
    isLoadingUpdatePromotion: false,
    isLoadingGetUserPromotionByCode: false,
    isLoadingGeneral: false,
    error: data.message
  })),
  on(PromotionStoreActions.promotionSuccess, (state: State, { data }) => ({
    ...state,
    success: data.message
  })),
  on(PromotionStoreActions.errorToNull, (state: State) => ({
    ...state,
    error: null
  })),
  on(PromotionStoreActions.successToNull, (state: State) => ({
    ...state,
    success: null
  })),
  on(PromotionStoreActions.clearPromotion, (state: State) => ({
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
  }))
);

// tslint:disable-next-line: only-arrow-functions
export function promotionReducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
