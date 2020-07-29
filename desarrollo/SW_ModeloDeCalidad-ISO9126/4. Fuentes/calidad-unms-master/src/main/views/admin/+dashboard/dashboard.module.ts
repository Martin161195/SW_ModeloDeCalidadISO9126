import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule { }
