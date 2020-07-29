import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VMFormAutocompleteModule } from '../vm-form-autocomplete/vm-form-autocomplete.module';
import { VMFormSelectAutocompleteComponent } from './vm-form-select-autocomplete.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    VMFormSelectAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VMFormAutocompleteModule,
    FontAwesomeModule
  ],
  exports: [
    VMFormSelectAutocompleteComponent
  ],
  providers: []
})
export class VMFormSelectAutocompleteModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSpinner
    );
  }
}
