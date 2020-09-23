import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VMDropFilesDirective } from './vm-drop-files.directive';
import { VMDropPerfilComponent } from './vm-drop-perfil.component';
import { VMDropZoneComponent } from './vm-drop-zone.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    VMDropZoneComponent,
    VMDropPerfilComponent
  ],
  declarations: [
    VMDropZoneComponent,
    VMDropPerfilComponent,
    VMDropFilesDirective
  ],
  providers: []
})
export class VMDropZoneModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCloudUploadAlt,
      faTimes
    );
  }
}
