import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EstablishmentStoreEffects } from './effects';
import { establishmentReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('establishment', establishmentReducer),
    EffectsModule.forFeature([EstablishmentStoreEffects])
  ],
  providers: [EstablishmentStoreEffects]
})
export class EstablishmentStoreModule { }
