import { Discount } from "./discount";
import { Cost } from "./cost";
import { Bank } from "./bank";
import { Pyme } from "./pyme";

export class DiscountPool {
	discountPoolId?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	pyme?: Pyme;
	bank?: Bank;
	discounts?: Discount[];
}

/*
	DiscountPool{

		Discount[
			{
				props,
				bill: Bill
			},
			{
				props,
				bill: Bill
			}
		]
	}
*/
