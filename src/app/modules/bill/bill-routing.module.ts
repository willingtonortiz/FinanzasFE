import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddBillComponent } from "./pages";

const routes: Routes = [
	{
		path: "",
		redirectTo: "add-bill",
		pathMatch: "full"
	},
	{
		path: "add-bill",
		component: AddBillComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BillRoutingModule {}
