import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyType'
})
export class CurrencyTypePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
