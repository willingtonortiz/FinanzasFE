import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "rateType"
})
export class RateTypePipe implements PipeTransform {
	transform(value: number, ...args: any[]): any {
		if (value === 1) {
			return "N";
		} else if (value === 2) {
			return "E";
		}
	}
}
