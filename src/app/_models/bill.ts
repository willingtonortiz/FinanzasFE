export interface Bill {
	billId?: number;
	startDate?: Date;
	endDate?: Date;
	currency?: string;
	amount?: number;
	billType?: number;
	drawerRuc?: string;
	draweeRuc?: string;
}
