import { NgModule } from '@angular/core';
import { VMTooltipModule } from '@core/lib/components/popus/tooltip/vm-tooltip.module';

import { CommonModule } from '@angular/common';
import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMDropdownModule } from '@core/lib/components/menu/vm-dropdown/vm-dropdown.module';
import { VMCardModule } from '@core/lib/components/panel/card/vm-card.module';
import { DashboardRoutingModule } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH, faFileDownload, faTable, faTimes } from '@fortawesome/free-solid-svg-icons';

import { faEdit, faEye, faFilePdf, faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    VMCardModule,
    VMButtonModule,
    VMDropdownModule,
    VMTooltipModule,
    FontAwesomeModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faEdit,
      faEye,
      faEllipsisH,
      faFileDownload,
      faFilePdf,
      faPlusSquare,
      faTable,
      faTrashAlt,
      faTimes
    );
  }
}
