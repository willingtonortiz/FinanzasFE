import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "currencyCode"
})
export class CurrencyCodePipe implements PipeTransform {
	transform(value: number, ...args: any[]): any {
		if (value === 1) {
			return "Soles Peruanos";
		} else if (value === 2) {
			return "Dólares Americanos";
		}
	}
}
