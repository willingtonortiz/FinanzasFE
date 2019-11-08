import { CreateDiscount } from "./CreateDiscount";

export interface CreateDiscountPool {
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date | string;
	pymeId?: number;
	bankId?: number;
	// Los descuentos
	discounts?: Array<CreateDiscount>;
}
