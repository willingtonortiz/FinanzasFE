import { CurrencyCode, BillType, BillStatus } from "../../enums";

export interface BillInput {
	id?: number;
	startDate?: Date;
	endDate?: Date;
	currencyCode?: CurrencyCode;
	amount?: number;
	type?: BillType;
	status?: BillStatus;
	drawerRuc?: string;
	draweeRuc?: string;
	paymentPlace?: string;
	signPlace?: string;
	pymeId?: number;
}
