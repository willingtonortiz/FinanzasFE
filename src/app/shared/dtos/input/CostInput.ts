import { CostType, PaymentType, CurrencyCode } from "../../enums";

export interface CostInput {
	id?: string;
	reason?: string;
	costType?: CostType;
	amount?: number;
	paymentType?: PaymentType;
	currencyCode?: CurrencyCode;
}
