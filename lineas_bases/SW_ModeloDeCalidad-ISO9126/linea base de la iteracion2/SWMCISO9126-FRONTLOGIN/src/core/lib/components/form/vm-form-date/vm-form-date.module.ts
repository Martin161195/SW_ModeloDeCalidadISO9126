import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE
} from '@danielmoncada/angular-datetime-picker';

import { VMFormDateComponent } from './vm-form-date.component';
import { VMOwlDateTimeInlineComponent } from './vm-owl-date-time-inline.component';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';

// learn more about this from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
  datePickerInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
  timePickerInput: { hour: 'numeric', minute: 'numeric' },
  monthYearLabel: { year: 'numeric', month: 'short' },
  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'long' }
};

@NgModule({
  declarations: [
    VMFormDateComponent,
    VMOwlDateTimeInlineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    VMFormDateComponent,
    VMOwlDateTimeInlineComponent
  ],
  providers: [
    {
      provide: OWL_DATE_TIME_LOCALE,
      useValue: 'es'
    },
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: MY_NATIVE_FORMATS
    }
  ]
})
export class VMFormDateModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCalendarAlt,
      faClock
    );
  }
}
