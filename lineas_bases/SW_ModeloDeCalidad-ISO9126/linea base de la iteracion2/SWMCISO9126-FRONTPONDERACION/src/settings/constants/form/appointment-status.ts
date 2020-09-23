import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';

export const StatusPending = 1;
export const StatusActive = 2;
export const StatusSuccess = 3;
export const StatusCanceled = 4;

export const TypesOfAppointmentStatus: Array<SelectListItem> = [
  {
    text: 'PENDIENTE',
    value: 1
  },
  {
    text: 'EN PROCESO',
    value: 2
  },
  {
    text: 'COMPLETADO',
    value: 3
  },
  {
    text: 'CANCELADO',
    value: 4
  },
  {
    text: 'ELIMINADO',
    value: 4
  }
];
