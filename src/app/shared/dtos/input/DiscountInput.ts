import { CostInput } from "./CostInput";

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
	billId?: number;
	costs?: Array<CostInput>;
}
