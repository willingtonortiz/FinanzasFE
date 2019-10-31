import { Discount } from "../discount/discount";
import { Bank } from "../bank/bank";
import { Pyme } from "../pyme/pyme";

export interface DiscountPool {
	discountPoolId?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date;
	pyme?: Pyme;
	bank?: Bank;
	discounts?: Discount[];
}
