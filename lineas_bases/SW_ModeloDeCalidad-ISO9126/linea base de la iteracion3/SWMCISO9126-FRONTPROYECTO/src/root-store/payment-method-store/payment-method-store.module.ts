import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PaymentMethodStoreEffects } from './effects';
import { paymentMethodReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('payment-method', paymentMethodReducer),
    EffectsModule.forFeature([PaymentMethodStoreEffects])
  ],
  providers: [PaymentMethodStoreEffects]
})
export class PaymentMethodStoreModule { }
