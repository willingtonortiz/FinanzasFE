import { Pipe, PipeTransform } from "@angular/core";
import { Bill } from "../../models";
import { BillType, CurrencyCode } from "../../enums";

@Pipe({
	name: "billAmount"
})
export class BillAmountPipe implements PipeTransform {
	transform(value: Bill, ...args: any[]): any {
		if (value.currencyCode === CurrencyCode.PEN) {
			return `S/. ${value.amount}`;
		} else {
			return `$ ${value.amount}`;
		}
	}
}
