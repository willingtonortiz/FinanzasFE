import { CreateDiscount } from "./CreateDiscount";
import { CurrencyCode } from '../../enums';

export interface CreateDiscountPool {
	receivedValue?: number;
	deliveredValue?: number;
	tcea?: number;
	discountDate?: Date | string;
	currencyCode?: CurrencyCode;
	pymeId?: number;
	bankId?: number;
	// Los descuentos
	discounts?: Array<CreateDiscount>;
}
