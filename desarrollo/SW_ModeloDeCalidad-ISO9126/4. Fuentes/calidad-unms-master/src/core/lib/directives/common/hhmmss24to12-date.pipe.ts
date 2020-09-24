import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhmmss24to12Date'
})
export class HHMMSS24TO12DatePipe implements PipeTransform {
  transform(value: string, sep?: any): any {
    let separator = ':';
    if (!!sep && typeof sep === 'string' && sep.length > 0) {
      separator = sep;
    }

    const values = value.split(separator)
      .map((v: string) => parseInt(v, 10));
    if (values.length === 3) {
      let timezone = 'am';
      if (values[0] > 12) {
        timezone = 'pm';
        values[0] = values[0] % 12;
      }

      const hour = values[0] < 10 ? `0${values[0]}` : `${values[0]}`;
      const minute = values[1] < 10 ? `0${values[1]}` : `${values[1]}`;

      return `${hour}:${minute} ${timezone}`;
    }

    return 'Invalid Date';
  }
}
