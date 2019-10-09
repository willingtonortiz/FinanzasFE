export interface Bill {
	id?: number;
	startDate?: Date;
	endDate?: Date;
	currency?: string;
	amount?: number;
	drawerId?: number;
	draweeId?: number;
	billType?: string;
}
