import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { coerceBooleanProp } from '@core/common/helpers';

export const isEmptyInputValue = (value: any): boolean => {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
};

export class CheckboxValidator {
  static required(AC: AbstractControl | FormControl): { [key: string]: any } {
    if (!coerceBooleanProp(AC.value)) {
      return { required: true };
    }

    return null;
  }
}

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl | FormControl): any {
    const password = AC.get('password').value; // to get value in input tag
    const repeatPassword = AC.get('repeatPassword').value; // to get value in input tag
    if (password !== repeatPassword) {
      AC.get('repeatPassword')
        .setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }
}

export class NumberValidator {
  static positive(): ValidatorFn {
    return (AC: AbstractControl | FormControl): ValidationErrors | null => {
      if (isEmptyInputValue(AC.value)) {
        return null;
      }
      const value = parseFloat(AC.value);

      return !isNaN(value) && value <= 0
        ? { positive: true }
        : null;
    };
  }

  static isInteger(): ValidatorFn {
    return (AC: AbstractControl | FormControl): ValidationErrors | null => {
      if (isEmptyInputValue(AC.value)) {
        return null;
      }

      const value = parseFloat(AC.value);

      return !Number.isInteger(value)
        ? { isInteger: true }
        : null;
    };
  }

}

export class AutocompleteValidator {
  static required(model: any): ValidatorFn {
    return (AC: AbstractControl | FormControl): ValidationErrors | null => {
      if (isEmptyInputValue(AC.value)) {
        return null;
      }

      if (!model) {
        return { requiredAutocomplete: true };
      }

      return null;
    };
  }
}
