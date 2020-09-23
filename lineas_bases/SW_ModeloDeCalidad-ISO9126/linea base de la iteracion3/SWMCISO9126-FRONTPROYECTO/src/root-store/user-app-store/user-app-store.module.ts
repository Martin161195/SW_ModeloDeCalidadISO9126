import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserAppStoreEffects } from './effects';
import { userAppReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user-app', userAppReducer),
    EffectsModule.forFeature([UserAppStoreEffects])
  ],
  providers: [UserAppStoreEffects]
})
export class UserAppStoreModule { }
