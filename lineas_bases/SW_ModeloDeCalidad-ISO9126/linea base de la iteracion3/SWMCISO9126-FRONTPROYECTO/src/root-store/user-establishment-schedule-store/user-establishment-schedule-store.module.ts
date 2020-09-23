import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEstablishmentScheduleStoreEffects } from './effects';
import { userEstablishmentScheduleReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user-establishment-schedule', userEstablishmentScheduleReducer),
    EffectsModule.forFeature([UserEstablishmentScheduleStoreEffects])
  ],
  providers: [UserEstablishmentScheduleStoreEffects]
})
export class UserEstablishmentScheduleStoreModule { }
