import { Pipe, PipeTransform } from "@angular/core";
import { Bill } from "../../models";
import { BillType, CurrencyCode } from "../../enums";

@Pipe({
	name: "billAmount"
})
export class BillAmountPipe implements PipeTransform {
	/**
	 *
	 * @param value Bill to proccess
	 */
	transform(value: Bill): string {
		if (value.currencyCode === CurrencyCode.PEN) {
			return `S/. ${value.amount}`;
		} else {
			return `$ ${value.amount}`;
		}
	}
}
