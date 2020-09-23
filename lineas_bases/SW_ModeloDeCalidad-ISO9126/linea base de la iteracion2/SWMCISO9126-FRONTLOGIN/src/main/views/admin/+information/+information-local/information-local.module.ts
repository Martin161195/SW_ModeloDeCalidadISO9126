import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMCardModule } from '@core/lib/components/panel/card/vm-card.module';

import { InformationLocalComponent } from './information-local.component';
import { InformationLocalRoutingModule } from './information-local.routing';

@NgModule({
  declarations: [
    InformationLocalComponent
  ],
  imports: [
    InformationLocalRoutingModule,
    FormsModule,
    CommonModule,
    VMCardModule,
    VMButtonModule
  ],
  exports: [],
  providers: []
})
export class InformationLocalModule { }
