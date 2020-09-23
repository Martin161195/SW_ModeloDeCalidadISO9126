import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';

export const NEVER = 1;
export const AFTER = 4;

export const TypeOfFreqEndDate: Array<SelectListItem> = [
  {
    text: 'Nunca',
    value: NEVER
  },
  {
    text: 'Después de',
    value: AFTER
  }
];
