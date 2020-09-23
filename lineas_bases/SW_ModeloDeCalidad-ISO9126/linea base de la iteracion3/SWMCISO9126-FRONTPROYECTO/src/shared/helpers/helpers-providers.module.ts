import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdminGuard } from '@providers/guards/admin.guard';
import { LoginGuard } from '@providers/guards/login.guard';
import { httpInterceptorsProviders } from '@providers/interceptors';
import { AdminAuthService } from './api/admin-auth.service';
import { ResizeService } from './events/resize.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [],
  declarations: [],
  providers: [
    ResizeService,
    AdminAuthService,
    LoginGuard,
    AdminGuard,
    httpInterceptorsProviders,
    ApiService
  ]
})
export class HelpersProvidersModule { }
