import { Pipe, PipeTransform } from "@angular/core";
import { Bill } from "../../models";
import { BillStatus } from "../../enums";

@Pipe({
	name: "billStatus"
})
export class BillStatusPipe implements PipeTransform {
	transform(value: Bill, ...args: any[]): any {
		if (value.status === BillStatus.VALID) {
			return "Valida";
		} else if (value.status === BillStatus.EXPIRED) {
			return "Expirada";
		} else if (value.status === BillStatus.NOT_CREATED) {
			return "No creada";
		} else if (value.status === BillStatus.DISCOUNTED) {
			return "Descontado";
		}
	}
}
