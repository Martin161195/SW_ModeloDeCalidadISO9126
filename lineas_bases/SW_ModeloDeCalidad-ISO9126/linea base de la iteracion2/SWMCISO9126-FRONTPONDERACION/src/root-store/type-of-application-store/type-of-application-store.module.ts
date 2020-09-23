import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TypeOfApplicationStoreEffects } from './effects';
import { typeOfApplicationReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('type-of-application', typeOfApplicationReducer),
    EffectsModule.forFeature([TypeOfApplicationStoreEffects])
  ],
  providers: [TypeOfApplicationStoreEffects]
})
export class TypeOfApplicationStoreModule { }
