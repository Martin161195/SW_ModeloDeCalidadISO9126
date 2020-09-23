import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';

export const StatusActive = 1;
export const StatusInactive = 2;

export const TypesOfStatusTwo: Array<SelectListItem> = [
  {
    text: 'Activo',
    value: 1
  },
  {
    text: 'Inactivo',
    value: 2
  }
];
