import { Cost } from "../cost/cost";
import { CurrencyCode, BillType, BillStatus } from "../../enums";

export interface Bill {
	billId?: number;
	startDate?: Date;
	endDate?: Date;
	currencyCode?: CurrencyCode;
	amount?: number;
	billType?: BillType;
	billStatus?: BillStatus;
	drawerRuc?: string;
	draweeRuc?: string;
}
