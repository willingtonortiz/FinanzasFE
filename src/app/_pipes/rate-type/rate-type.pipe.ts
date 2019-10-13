import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateType'
})
export class RateTypePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
