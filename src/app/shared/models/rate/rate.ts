import { CurrencyCode, RateType, RateTerm } from "../../enums";

export interface Rate {
	id?: number;
	businessName?: string;
	currencyCode?: CurrencyCode;
	rateType?: RateType;
	rateTerm?: RateTerm;
	capitalizationTerm?: RateTerm;
	rateValue?: number;
}
