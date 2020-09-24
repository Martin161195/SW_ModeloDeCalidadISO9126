import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yyyymmddDate'
})
export class YYYYMMDDDatePipe implements PipeTransform {
  transform(value: string, sep?: any): any {
    let separator = '-';
    if (!!sep && typeof sep === 'string' && sep.length > 0) {
      separator = sep;
    }

    const values = value.split(separator);
    if (values.length === 3) {
      return `${values[2]}-${values[1]}-${values[0]}`;
    }

    return 'Invalid Date';
  }
}
