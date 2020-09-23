import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padString'
})
export class PadStringPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    let newValue = value.toString();
    if (args && typeof args === 'number') {
      newValue = newValue.padStart(args, '0');
    }

    return newValue;
  }
}
