import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMCardModule } from '@core/lib/components/panel/card/vm-card.module';

import { MetricaRoutingModule } from './metricas.routing';

import { MetricaComponent } from './metricas.component';

@NgModule({
  declarations: [
    MetricaComponent
  ],
  imports: [
    CommonModule,
    MetricaRoutingModule,
    VMCardModule,
    VMButtonModule
  ],
  exports: [],
  providers: []
})
export class MetricaModule { }
