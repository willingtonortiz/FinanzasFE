import { CreateCost } from "./CreateCost";

export interface CreateDiscount {
	retention: number;
	discountDays: number;
	tep: number;
	discountRate: number;
	initialCost: number;
	finalCost: number;
	netValue: number;
	receivedValue: number;
	deliveredValue: number;
	tcea: number;
	// La letra que descuenta
	billId: number;
	// Costos
	costs: Array<CreateCost>;
}
