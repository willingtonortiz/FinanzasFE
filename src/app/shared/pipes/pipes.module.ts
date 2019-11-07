import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Pipes
import { BillTypePipe } from "./bill-type/bill-type.pipe";
import { CurrencyTypePipe } from "./currency-type/currency-type.pipe";
import { RateTermPipe } from "./rate-term/rate-term.pipe";
import { RateTypePipe } from "./rate-type/rate-type.pipe";
import { BillAmountPipe } from "./bill-amount/bill-amount.pipe";

@NgModule({
	imports: [CommonModule],
	declarations: [
		BillTypePipe,
		CurrencyTypePipe,
		RateTermPipe,
		RateTypePipe,
		BillAmountPipe
	],
	exports: [
		BillTypePipe,
		CurrencyTypePipe,
		RateTermPipe,
		RateTypePipe,
		BillAmountPipe
	]
})
export class PipesModule {}
