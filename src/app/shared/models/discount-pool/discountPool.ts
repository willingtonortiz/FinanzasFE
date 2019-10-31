import { Discount } from "../discount/discount";
import { Cost } from "../cost/cost";
import { Bank } from "../bank/bank";
import { Pyme } from "../pyme/pyme";

export class DiscountPool {
	discountPoolId?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	pyme?: Pyme;
	bank?: Bank;
	discounts?: Discount[];
}
