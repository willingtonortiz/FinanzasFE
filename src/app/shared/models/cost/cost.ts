import { CostType, PaymentType, CurrencyCode } from "../../enums";

export interface Cost {
	id?: number;
	reason?: string;
	// Inicial o final
	costType?: CostType;
	amount?: number;
	paymentType?: PaymentType;
	currencyCode?: CurrencyCode;
}
