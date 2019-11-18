import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiscountRoutingModule } from "./discount-routing.module";
import {
	DiscountedBillComponent,
	DiscountedBillGroupComponent,
	SelectBillComponent,
	SelectBillContainerComponent,
	SelectBillGroupComponent,
	SelectCostComponent,
	DiscountPoolOverviewComponent
} from "./components";
import { DiscountContainerComponent } from "./pages";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { DisplaySelectedRateComponent } from "./components/display-selected-rate/display-selected-rate.component";
import { CostItemComponent } from './components/cost-item/cost-item.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		DiscountRoutingModule,
		PipesModule,
		ReactiveFormsModule
	],
	exports: [],
	declarations: [
		DiscountContainerComponent,
		DiscountPoolOverviewComponent,
		DiscountedBillComponent,
		DiscountedBillGroupComponent,
		SelectBillComponent,
		SelectBillContainerComponent,
		SelectBillGroupComponent,
		SelectCostComponent,
		DisplaySelectedRateComponent,
		CostItemComponent
	],
	providers: []
})
export class DiscountModule {}
