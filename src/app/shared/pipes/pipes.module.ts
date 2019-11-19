import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Pipes
import { BillTypePipe } from "./bill-type/bill-type.pipe";
import { CurrencyTypePipe } from "./currency-type/currency-type.pipe";
import { RateTermPipe } from "./rate-term/rate-term.pipe";
import { RateTypePipe } from "./rate-type/rate-type.pipe";
import { BillAmountPipe } from "./bill-amount/bill-amount.pipe";
import { BillStatusPipe } from "./bill-status/bill-status.pipe";
import { CurrencyCodePipe } from "./currency-code/currency-code.pipe";
import { CapitalizationTermPipe } from './capitalization-term/capitalization-term.pipe';
import { PaymentTypePipe } from './payment-type/payment-type.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [
		BillTypePipe,
		CurrencyTypePipe,
		RateTermPipe,
		RateTypePipe,
		BillAmountPipe,
		BillStatusPipe,
		BillStatusPipe,
		CurrencyCodePipe,
		CapitalizationTermPipe,
		PaymentTypePipe
	],
	exports: [
		BillTypePipe,
		CurrencyTypePipe,
		RateTermPipe,
		RateTypePipe,
		BillAmountPipe,
		BillStatusPipe,
		CurrencyCodePipe,
		CapitalizationTermPipe,
		PaymentTypePipe
	]
})
export class PipesModule {}
