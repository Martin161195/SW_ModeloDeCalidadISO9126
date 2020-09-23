import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppointmentStoreModule } from './appointment-store';
import { AuthStoreModule } from './auth-store';
import { CategoryStoreModule } from './category-store';
import { CurrencyStoreModule } from './currency-store';
import { EstablishmentStoreModule } from './establishment-store';
import { GeneralStoreModule } from './general-store';
import { LocalStoreModule } from './local-store';
import { ModuleStoreModule } from './module-store';
import { PaymentMethodStoreModule } from './payment-method-store';
import { ProductStoreModule } from './product-store';
import { PromotionStoreModule } from './promotion-store';
import { RoleStoreModule } from './role-store';
import { rootStoreReducer } from './root-store.reducer';
import { ServiceStoreModule } from './service-store';
import { StatusAppointmentStoreModule } from './status-appointment-store';
import { TypeOfApplicationStoreModule } from './type-of-application-store';
import { UserAppStoreModule } from './user-app-store';
import { UserEstablishmentScheduleStoreModule } from './user-establishment-schedule-store';
import { UserEstablishmentStoreModule } from './user-establishment-store';
import { UserLocalStoreModule } from './user-local-store';
import { VoucherStoreModule } from './voucher-store';

@NgModule({
  imports: [
    CommonModule,
    AppointmentStoreModule,
    AuthStoreModule,
    EstablishmentStoreModule,
    CategoryStoreModule,
    CurrencyStoreModule,
    GeneralStoreModule,
    LocalStoreModule,
    ModuleStoreModule,
    PaymentMethodStoreModule,
    ProductStoreModule,
    PromotionStoreModule,
    RoleStoreModule,
    ServiceStoreModule,
    StatusAppointmentStoreModule,
    TypeOfApplicationStoreModule,
    UserAppStoreModule,
    UserEstablishmentStoreModule,
    UserEstablishmentScheduleStoreModule,
    UserLocalStoreModule,
    VoucherStoreModule,
    StoreModule.forRoot({
      root: rootStoreReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    })
  ],
  declarations: []
})
export class RootStoreModule { }
