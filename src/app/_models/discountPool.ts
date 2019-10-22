import { Discount } from "./discount";
import { Cost } from "./cost";

export class DiscountPool {
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
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
