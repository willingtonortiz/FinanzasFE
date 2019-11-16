import { DiscountInput } from "./DiscountInput";
import { CurrencyCode } from "../../enums";

export interface DiscountPoolInput {
	id?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date;
	currencyCode?: CurrencyCode;
	pymeId?: number;
	discounts?: Array<DiscountInput>;
}
