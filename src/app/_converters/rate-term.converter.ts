import { RateTerm } from "../_models";

export class RateTermConverter {
	public constructor() {}

	public static fromString(rateTerm: string) {
		if (rateTerm === RateTerm.Anual) {
			return 360;
		} else if (rateTerm === RateTerm.Semestral) {
			return 180;
		} else if (rateTerm === RateTerm.Cuatrimestral) {
			return 120;
		} else if (rateTerm === RateTerm.Trimestral) {
			return 90;
		} else if (rateTerm === RateTerm.Bimestral) {
			return 60;
		} else if (rateTerm === RateTerm.Mensual) {
			return 30;
		} else if (rateTerm == RateTerm.Quincenal) {
			return 15;
		} else {
			return 1;
		}
	}
}
