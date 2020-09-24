import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMCardBodyComponent } from './vm-card-body/vm-card-body.component';
import { VMCardFooterComponent } from './vm-card-footer/vm-card-footer.component';
import { VMCardHeaderComponent } from './vm-card-header/vm-card-header.component';
import { VMCardLoaderComponent } from './vm-card-loader/vm-card-loader.component';
import { VMCardComponent } from './vm-card/vm-card.component';

import { VMSpinnerMaterialModule } from '../../loader/spinner-material/vm-spinner-material.module';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faEdit, faEllipsisH, faTable } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMCardComponent,
    VMCardBodyComponent,
    VMCardFooterComponent,
    VMCardHeaderComponent,
    VMCardLoaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    VMSpinnerMaterialModule
  ],
  exports: [
    VMCardComponent,
    VMCardBodyComponent,
    VMCardFooterComponent,
    VMCardHeaderComponent,
    VMCardLoaderComponent
  ],
  providers: []
})
export class VMCardModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCog,
      faEdit,
      faEllipsisH,
      faTable
    );
  }
}
