import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiscountRoutingModule } from "./discount-routing.module";
import {
	DiscountedBillComponent,
	DiscountedBillGroupComponent,
	SelectBillComponent,
	SelectBillContainerComponent,
	SelectBillGroupComponent,
	SelectCostComponent
} from "./components";
import {
	DiscountContainerComponent,
	DiscountPoolOverviewComponent
} from "./pages";

@NgModule({
	declarations: [
		DiscountContainerComponent,
		DiscountPoolOverviewComponent,
		DiscountedBillComponent,
		DiscountedBillGroupComponent,
		SelectBillComponent,
		SelectBillContainerComponent,
		SelectBillGroupComponent,
		SelectCostComponent
	],
	imports: [CommonModule, DiscountRoutingModule]
})
export class DiscountModule {}
