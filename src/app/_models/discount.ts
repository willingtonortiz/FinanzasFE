import { Bill } from "./bill";
import { Cost } from "./cost";

export interface Discount {
	discountId?: number;
	retention?: number;
	discountDays?: number;
	tep?: number;
	discountRate?: number;
	discount?: number;
	initialCost?: number;
	finalCost?: number;
	netValue?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	bill?: Bill;
	costs?: Cost[];
}
