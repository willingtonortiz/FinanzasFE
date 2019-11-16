import { Discount } from "../discount/discount";
import { Bank } from "../bank/bank";
import { Pyme } from "../pyme/pyme";
import { CurrencyCode } from "../../enums";

export interface DiscountPool {
	discountPoolId?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date;
	currencyCode?: CurrencyCode;
	pyme?: Pyme;
	bank?: Bank;
	discounts?: Discount[];
}
