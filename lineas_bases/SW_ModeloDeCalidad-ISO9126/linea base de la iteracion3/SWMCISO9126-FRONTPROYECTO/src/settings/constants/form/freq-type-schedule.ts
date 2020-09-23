import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';

export const ONCE = 1;
export const DAY = 4;
export const WEEK = 8;
export const MONTH = 16;

// Se comento el resto de valores, ya que solo se aceptara horarios sin recurrencia por la complejidad en el back y el tiempo
export const TypeOfFreqTypeSchedule: Array<SelectListItem> = [
  {
    text: 'Solo una Vez',
    value: ONCE
  }/* ,
  {
    text: 'Dia',
    value: DAY
  },
  {
    text: 'Semana',
    value: WEEK
  },
  {
    text: 'Mes',
    value: MONTH
  } */
];
