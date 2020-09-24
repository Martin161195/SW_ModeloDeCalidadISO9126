import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GeneralStoreEffects } from './effects';
import { generalReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('general', generalReducer),
    EffectsModule.forFeature([GeneralStoreEffects])
  ],
  providers: [GeneralStoreEffects]
})
export class GeneralStoreModule { }
