import { Pipe, PipeTransform } from "@angular/core";
import { Bill, CurrencyType } from "src/app/_models";

@Pipe({
	name: "currencyType"
})
export class CurrencyTypePipe implements PipeTransform {
	transform(value: Bill, ...args: any[]): any {
		if (value.currency === CurrencyType.Soles) {
			return "S/. " + value.amount.toFixed(2);
		} else {
			return "$ " + value.amount.toFixed(2);
		}
	}
}
