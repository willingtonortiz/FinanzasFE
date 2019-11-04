import { RateTerm } from "../enums";

export class RateTermConverter {
	public constructor() {}

	public static fromString(rateTerm: RateTerm) {
		if (rateTerm === RateTerm.ANNUAL) {
			return 360;
		} else if (rateTerm === RateTerm.SIX_MONTHLY) {
			return 180;
		} else if (rateTerm === RateTerm.QUARTERLY) {
			return 120;
		} else if (rateTerm === RateTerm.THREE_MONTHLY) {
			return 90;
		} else if (rateTerm === RateTerm.BIMONTHLY) {
			return 60;
		} else if (rateTerm === RateTerm.MONTHLY) {
			return 30;
		} else if (rateTerm == RateTerm.BIWEEKLY) {
			return 15;
		} else {
			return 1;
		}
	}
}
