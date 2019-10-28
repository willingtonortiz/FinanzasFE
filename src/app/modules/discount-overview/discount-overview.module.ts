import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiscountOverviewRoutingModule } from "./discount-overview-routing.module";
import { DiscountOverviewContainerComponent } from "./pages";

@NgModule({
	declarations: [DiscountOverviewContainerComponent],
	imports: [CommonModule, DiscountOverviewRoutingModule]
})
export class DiscountOverviewModule {}
