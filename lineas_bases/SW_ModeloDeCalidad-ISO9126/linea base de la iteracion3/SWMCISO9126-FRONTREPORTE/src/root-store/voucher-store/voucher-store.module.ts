import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VoucherStoreEffects } from './effects';
import { voucherReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('voucher', voucherReducer),
    EffectsModule.forFeature([VoucherStoreEffects])
  ],
  providers: [VoucherStoreEffects]
})
export class VoucherStoreModule { }
