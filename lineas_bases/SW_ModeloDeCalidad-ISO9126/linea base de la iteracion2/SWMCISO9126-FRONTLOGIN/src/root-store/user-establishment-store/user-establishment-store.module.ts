import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEstablishmentStoreEffects } from './effects';
import { userEstablishmentReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user-establishment', userEstablishmentReducer),
    EffectsModule.forFeature([UserEstablishmentStoreEffects])
  ],
  providers: [UserEstablishmentStoreEffects]
})
export class UserEstablishmentStoreModule { }
