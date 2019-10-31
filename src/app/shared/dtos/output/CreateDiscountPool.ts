import { CreateDiscount } from "./CreateDiscount";

export interface CreateDiscountPool {
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	pymeId?: number;
	bankId?: number;
	// Los descuentos
	discounts: Array<CreateDiscount>;
}
