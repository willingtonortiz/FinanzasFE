import { Pipe, PipeTransform } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { CurrencyCode } from "../../enums";

@Pipe({
	name: "currencyType"
})
export class CurrencyTypePipe implements PipeTransform {
	transform(value: Bill, ...args: any[]): any {
		if (value.currencyCode === CurrencyCode.PEN) {
			return "S/. " + value.amount.toFixed(2);
		} else {
			return "$ " + value.amount.toFixed(2);
		}
	}
}
