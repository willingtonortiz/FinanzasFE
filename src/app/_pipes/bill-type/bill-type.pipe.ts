import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "billType"
})
export class BillTypePipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		if (value === 1) {
			return "Por cobrar";
		} else if (value === 2) {
			return "Por pagar";
		} else {
			return "Descontada";
		}
	}
}
