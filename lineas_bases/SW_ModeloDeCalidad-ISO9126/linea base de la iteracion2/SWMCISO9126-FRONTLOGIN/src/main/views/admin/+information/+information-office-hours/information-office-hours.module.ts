import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMCardModule } from '@core/lib/components/panel/card/vm-card.module';

import { AccesibilidadComponent } from './accesibilidad-component/accesibilidad-component.component';
import { AprendizajeComponent } from './aprendizaje-component/aprendizaje-component.component';
import { EsteticaComponent } from './estetica-component/estetica-component.component';
import { InformationOfficeHoursComponent } from './information-office-hours.component';
import { InformationOfficeHoursRoutingModule } from './information-office-hours.routing';
import { InteligibilidadComponent } from './inteligibilidad-component/inteligibilidad-component.component';
import { OperabilidadComponent } from './operabilidad-component/operabilidad-component.component';
import { ProteccionComponent } from './proteccion-component/proteccion-component.component';

@NgModule({
  declarations: [
    InformationOfficeHoursComponent,
    AccesibilidadComponent,
    AprendizajeComponent,
    EsteticaComponent,
    InteligibilidadComponent,
    OperabilidadComponent,
    ProteccionComponent
  ],
  imports: [
    InformationOfficeHoursRoutingModule,
    CommonModule,
    VMCardModule,
    VMButtonModule,
    FormsModule
  ],
  exports: [],
  providers: []
})
export class InformationOfficeHoursModule { }
