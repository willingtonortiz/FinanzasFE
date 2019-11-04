import { CurrencyCode, RateType, RateTerm } from "../../enums";

export interface Rate {
	businessName?: string;
	currencyCode?: CurrencyCode;
	rateType?: RateType;
	rateTerm?: RateTerm;
	rateValue?: number;
	capitalizationDays?: number;
}
