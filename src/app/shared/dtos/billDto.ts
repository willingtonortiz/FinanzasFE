export interface BillDto {
	billId?: number;
	startDate?: Date;
	endDate?: Date;
	currency?: string;
	amount?: number;
	billType?: number;
	drawerRuc?: string;
	draweeRuc?: string;
}
