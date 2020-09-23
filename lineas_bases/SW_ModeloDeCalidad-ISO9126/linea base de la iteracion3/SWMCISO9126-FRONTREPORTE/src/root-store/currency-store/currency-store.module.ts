import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CurrencyStoreEffects } from './effects';
import { currencyReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('currency', currencyReducer),
    EffectsModule.forFeature([CurrencyStoreEffects])
  ],
  providers: [CurrencyStoreEffects]
})
export class CurrencyStoreModule { }
