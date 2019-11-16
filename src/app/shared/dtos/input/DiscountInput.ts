import { CostInput } from "./CostInput";
import { BillInput } from "./BillInput";

export interface DiscountInput {
	id?: number;
	retention?: number;
	discountDays?: number;
	tep?: number;
	discountRate?: number;
	initialCost?: number;
	finalCost?: number;
	netValue?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	bill?: BillInput;
	costs?: Array<CostInput>;
}
