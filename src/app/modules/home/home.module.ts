import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages";
import { BillComponent, BillGroupComponent } from "./components";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { NoBillsFoundComponent } from "./components/no-bills-found/no-bills-found.component";
import { DiscountedPoolGroupComponent } from "./components/discounted-pool-group/discounted-pool-group.component";
import { DiscountedPoolItemComponent } from "./components/discounted-pool-item/discounted-pool-item.component";
import { NoDiscountPoolsFoundComponent } from "./components/no-discount-pools-found/no-discount-pools-found.component";

@NgModule({
	imports: [CommonModule, HomeRoutingModule, ComponentsModule, PipesModule],
	declarations: [
		HomeComponent,
		BillComponent,
		BillGroupComponent,
		NoBillsFoundComponent,
		DiscountedPoolGroupComponent,
		DiscountedPoolItemComponent,
		NoDiscountPoolsFoundComponent
	]
})
export class HomeModule {}
