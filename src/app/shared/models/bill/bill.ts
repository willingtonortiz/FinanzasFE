import { Cost } from "../cost/cost";

export interface Bill {
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
