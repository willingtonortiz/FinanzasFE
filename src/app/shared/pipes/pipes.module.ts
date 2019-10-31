import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Pipes
import { BillTypePipe } from "./bill-type/bill-type.pipe";
import { CurrencyTypePipe } from "./currency-type/currency-type.pipe";
import { RateTermPipe } from "./rate-term/rate-term.pipe";
import { RateTypePipe } from "./rate-type/rate-type.pipe";

@NgModule({
	imports: [CommonModule],
	declarations: [BillTypePipe, CurrencyTypePipe, RateTermPipe, RateTypePipe],
	exports: [BillTypePipe, CurrencyTypePipe, RateTermPipe, RateTypePipe]
})
export class PipesModule {}
