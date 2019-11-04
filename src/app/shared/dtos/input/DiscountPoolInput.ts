import { DiscountInput } from "./DiscountInput";

export interface DiscountPoolInput {
	id?: number;
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date;
	pymeId?: number;
	// Los descuentos
	discounts?: Array<DiscountInput>;
}
