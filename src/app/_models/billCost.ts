import { Cost } from "./cost";

export interface BillCost {
	billId?: number;
	startDate?: Date;
	endDate?: Date;
	currency?: string;
	amount?: number;
	billType?: number;
	drawerRuc?: string;
	draweeRuc?: string;
	initialCosts?: Cost[];
	finalCosts?: Cost[];
}
