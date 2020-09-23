import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '@core/common/validators';
import { MinutesOfDay } from '@shared/helpers/functions/date';

export class VoucherProductValidator {

  static compareDiscountAndPrice(): ValidatorFn {
    return (AC: AbstractControl | FormControl): ValidationErrors | null => {
      const controlDiscount = AC.get('discount');
      if (isEmptyInputValue(controlDiscount.value)) {
        return null;
      }

      const price = parseFloat(AC.get('price').value);
      const discount = parseFloat(controlDiscount.value);

      if (discount > price) {
        controlDiscount.setErrors({
          dicountAndPriceVoucher: {
            message: 'El descuento no puede ser mayor al precio'
          }
        });
      }

      return null;
    };
  }

  static compareQuantityAndStock(): ValidatorFn {
    return (AC: AbstractControl | FormControl): ValidationErrors | null => {
      const controlQuantity = AC.get('quantity');
      if (isEmptyInputValue(controlQuantity.value)) {
        return null;
      }

      const stock = parseFloat(AC.get('stock').value);
      const quantity = parseFloat(controlQuantity.value);

      if (quantity > stock) {
        controlQuantity.setErrors({
          quantityAndStockVoucher: {
            message: 'El cantidad elegida no puede ser mayor al stock del producto'
          }
        });
      }

      return null;
    };
  }

  static compareStartAndEndTime(): ValidatorFn {
    return (AC: AbstractControl | FormControl): ValidationErrors | null => {
      const controlStart = AC.get('scheduleAppointmentStartTime');
      const controlEnd = AC.get('scheduleAppointmentEndTime');
      if (isEmptyInputValue(controlEnd.value) || isEmptyInputValue(controlStart.value)) {
        return null;
      }

      if (MinutesOfDay(controlStart.value) >= MinutesOfDay(controlEnd.value)) {
        controlEnd.setErrors({
          startAndEndTimeVoucher: {
            message: 'La Hora de Fin no puede ser menor o igual que la Hora de Inicio'
          }
        });
      }

      return null;
    };
  }

}
