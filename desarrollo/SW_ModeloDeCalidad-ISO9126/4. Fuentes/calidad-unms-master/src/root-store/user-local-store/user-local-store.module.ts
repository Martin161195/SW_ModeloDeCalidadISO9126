import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserLocalStoreEffects } from './effects';
import { userLocalReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user-local', userLocalReducer),
    EffectsModule.forFeature([UserLocalStoreEffects])
  ],
  providers: [UserLocalStoreEffects]
})
export class UserLocalStoreModule { }
