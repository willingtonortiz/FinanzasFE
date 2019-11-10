import { Pipe, PipeTransform } from "@angular/core";
import { Bill } from "../../models";
import { BillType } from "../../enums";

@Pipe({
	name: "billType"
})
export class BillTypePipe implements PipeTransform {
	transform(value: Bill, ...args: any[]): any {
		if (value.type === BillType.TO_PAY) {
			return "Por cobrar";
		} else if (value.type === BillType.TO_CHARGE) {
			return "Por pagar";
		}
	}
}
