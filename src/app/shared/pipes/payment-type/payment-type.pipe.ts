import { Pipe, PipeTransform } from "@angular/core";
import { PaymentType } from "../../enums";

@Pipe({
	name: "paymentType"
})
export class PaymentTypePipe implements PipeTransform {
	transform(value: PaymentType): string {
		if (value === null) {
			return "";
		}

		if (value == PaymentType.CASH) {
			return "Efectivo";
		} else if (value == PaymentType.PERCENTAGE) {
			return "Porcentaje";
		}
	}
}
