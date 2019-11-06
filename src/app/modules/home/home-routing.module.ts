import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages";
import { BillGroupComponent } from "./components";

const routes: Routes = [
	// {
	// 	path: "",
	// 	component: BillGroupComponent
	// }
	{
		path: "",
		component: HomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}
