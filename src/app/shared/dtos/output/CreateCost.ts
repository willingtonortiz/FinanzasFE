import { PaymentType, CurrencyCode, CostType } from "../../enums";

export interface CreateCost {
	reason?: string;
	costType?: CostType;
	amount?: number;
	paymentType?: PaymentType;
	currencyCode?: CurrencyCode;
}
