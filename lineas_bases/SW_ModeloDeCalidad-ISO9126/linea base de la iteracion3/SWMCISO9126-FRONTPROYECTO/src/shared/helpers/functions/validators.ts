import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl): any {
    const password = AC.get('password').value; // to get value in input tag
    const repeatPassword = AC.get('repeatPassword').value; // to get value in input tag
    if (password !== repeatPassword) {
      AC.get('repeatPassword')
        .setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}

export class NumberValidator {
  static GreaterThanZero(AC: AbstractControl): any {
    const num = AC.value;
    if (typeof (num) !== 'number' || num < 1) {
      return { GreaterThanZero: true };
    }

    return null;
  }
}
