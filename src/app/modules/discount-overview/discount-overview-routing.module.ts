import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DiscountOverviewContainerComponent } from "./pages";

const routes: Routes = [
	{
		path: ":id",
		component: DiscountOverviewContainerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DiscountOverviewRoutingModule {}
