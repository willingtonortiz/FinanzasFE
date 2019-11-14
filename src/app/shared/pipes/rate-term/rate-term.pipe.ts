import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "rateTerm"
})
export class RateTermPipe implements PipeTransform {
	transform(value: number, ...args: any[]): any {
		if (value === 1) {
			return "D";
		} else if (value === 2) {
			return "Q";
		}
		else if (value === 3) {
			return "M";
		}
		else if (value === 4) {
			return "B";
		}
		else if (value === 5) {
			return "T";
		}
		else if (value === 6) {
			return "C";
		}
		else if (value === 7) {
			return "S";
		}
		else if (value === 8) {
			return "A";
		}
	}
}
