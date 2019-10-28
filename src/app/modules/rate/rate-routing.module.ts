import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SelectRateComponent } from "./pages";

const routes: Routes = [
	{
		path: "",
		component: SelectRateComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RateRoutingModule {}
