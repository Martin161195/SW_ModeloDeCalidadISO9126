import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PromotionStoreEffects } from './effects';
import { promotionReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('promotion', promotionReducer),
    EffectsModule.forFeature([PromotionStoreEffects])
  ],
  providers: [PromotionStoreEffects]
})
export class PromotionStoreModule { }
