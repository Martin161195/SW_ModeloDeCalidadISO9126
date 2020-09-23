import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StatusAppointmentStoreEffects } from './effects';
import { statusAppointmentReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('status-appointment', statusAppointmentReducer),
    EffectsModule.forFeature([StatusAppointmentStoreEffects])
  ],
  providers: [StatusAppointmentStoreEffects]
})
export class StatusAppointmentStoreModule { }
