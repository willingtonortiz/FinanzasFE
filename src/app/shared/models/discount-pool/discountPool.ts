import { CurrencyCode } from "../../enums";

export interface DiscountPool {
	id?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date;
	currencyCode?: CurrencyCode;
}
