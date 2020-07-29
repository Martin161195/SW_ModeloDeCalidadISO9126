import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModuleStoreEffects } from './effects';
import { moduleReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('module', moduleReducer),
    EffectsModule.forFeature([ModuleStoreEffects])
  ],
  providers: [ModuleStoreEffects]
})
export class ModuleStoreModule { }
