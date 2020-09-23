import { NgModule } from '@angular/core';
import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMCardModule } from '@core/lib/components/panel/card/vm-card.module';

import { InformationEstablishmentComponent } from './information-establishment.component';
import { InformationEstablishmentRoutingModule } from './information-establishment.routing';

@NgModule({
  declarations: [
    InformationEstablishmentComponent
  ],
  imports: [
    InformationEstablishmentRoutingModule,
    VMCardModule,
    VMButtonModule
  ],
  exports: [],
  providers: []
})
export class InformationEstablishmentModule { }
