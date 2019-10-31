import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DiscountContainerComponent } from "./pages";

const routes: Routes = [
	{
		path: "",
		component: DiscountContainerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DiscountRoutingModule {}
