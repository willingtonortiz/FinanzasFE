import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiscountOverviewRoutingModule } from "./discount-overview-routing.module";
import { DiscountOverviewContainerComponent } from "./pages";
import { DiscountedBillInfoComponent } from "./components/discounted-bill-info/discounted-bill-info.component";
import { DiscountedBillInfoGroupComponent } from "./components/discounted-bill-info-group/discounted-bill-info-group.component";
import { PipesModule } from "src/app/shared/pipes/pipes.module";

@NgModule({
	imports: [CommonModule, DiscountOverviewRoutingModule, PipesModule],
	declarations: [
		DiscountOverviewContainerComponent,
		DiscountedBillInfoComponent,
		DiscountedBillInfoGroupComponent
	]
})
export class DiscountOverviewModule {}
