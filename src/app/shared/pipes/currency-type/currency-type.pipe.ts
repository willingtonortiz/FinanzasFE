import { Pipe, PipeTransform } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { CurrencyCode } from "../../enums";

@Pipe({
	name: "currencyType"
})
export class CurrencyTypePipe implements PipeTransform {
	transform(value: number, currencyCode?: CurrencyCode): any {
		if (currencyCode === null) {
			return "S/. " + value.toFixed(2);
		}

		if (currencyCode === CurrencyCode.PEN) {
			return "S/. " + value.toFixed(2);
		} else {
			return "$ " + value.toFixed(2);
		}
	}
}
