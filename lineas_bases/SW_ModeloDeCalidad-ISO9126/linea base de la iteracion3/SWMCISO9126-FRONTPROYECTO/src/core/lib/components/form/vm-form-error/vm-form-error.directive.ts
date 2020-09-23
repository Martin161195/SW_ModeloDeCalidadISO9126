import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'VMDisplayError'
})
export class VMFormErrorDirective implements PipeTransform {

  /**
   * @description
   * Errores de los Validadores tanto por Angular y los personalizados
   * Esto se llenara cada vez que se cree un nuevo validador con su respectivo mensaje
   */
  readonly errorMessages: { [key: string]: (value?: any) => string } = {
    requiredAutocomplete: () => 'Tiene que seleccionar un item de la lista.',
    required: () => 'Este campo es obligatorio.',
    email: () => 'Ingrese un correo electrónico válido',
    min: (value: any) => `El valor mínimo es ${value.min}`,
    max: (value: any) => `El valor máximo es ${value.max}`,
    minlength: (value: any) => `El número mínimo de caracteres es ${value.requiredLength}`,
    maxlength: (value: any) => `El número máximo de caracteres es ${value.requiredLength}`,
    patterm: () => 'El formato ingresado es incorrecto',
    positive: () => 'El valor ingresado debe ser mayor a 0.',
    isInteger: () => 'El valor ingresado debe ser un numero entero',
    matchPassword: () => 'El texto ingresado no concuerda con la contraseña.',
    // Promotion
    searchPromotion: (value: any) => `La promocion ya existe con esta propiedad(${value.property})`,
    priceAndPercentPromotion: (value: any) => `${value.message}`,
    // Voucher
    dicountAndPriceVoucher: (value: any) => `${value.message}`,
    quantityAndStockVoucher: (value: any) => `${value.message}`,
    startAndEndTimeVoucher: (value: any) => `${value.message}`
  };

  transform(value: ValidationErrors, args?: any): any {
    return this.getError(value);
  }

  getError(errors: ValidationErrors): string {
    const _errors = Object.keys(errors)
      .map((field: string) => this.getMessage(field, errors[field]));

    return _errors.length ? [_errors[_errors.length - 1]][0] : '';
  }

  private getMessage(type: string, params: any): string {
    return this.errorMessages[type](params);
  }

}
