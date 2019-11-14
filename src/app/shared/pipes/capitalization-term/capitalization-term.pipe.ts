import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalizationTerm'
})
export class CapitalizationTermPipe implements PipeTransform {
	transform(value: number, ...args: any[]): any {
		if (value === 1) {
			return "Diaria";
		} else if (value === 2) {
			return "Quincenal";
		}
		else if (value === 3) {
			return "Mensual";
		}
		else if (value === 4) {
			return "Bimestral";
		}
		else if (value === 5) {
			return "Trimestral";
		}
		else if (value === 6) {
			return "Cuatrimestral";
		}
		else if (value === 7) {
			return "Semestral";
		}
		else if (value === 8) {
			return "Anual";
		}
	}

}
