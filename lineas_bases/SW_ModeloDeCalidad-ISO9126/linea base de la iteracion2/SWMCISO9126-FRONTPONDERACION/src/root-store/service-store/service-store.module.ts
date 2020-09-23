import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ServiceStoreEffects } from './effects';
import { serviceReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('service', serviceReducer),
    EffectsModule.forFeature([ServiceStoreEffects])
  ],
  providers: [ServiceStoreEffects]
})
export class ServiceStoreModule { }
