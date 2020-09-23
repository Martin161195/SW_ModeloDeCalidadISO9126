import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LocalStoreEffects } from './effects';
import { localReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('local', localReducer),
    EffectsModule.forFeature([LocalStoreEffects])
  ],
  providers: [LocalStoreEffects]
})
export class LocalStoreModule { }
