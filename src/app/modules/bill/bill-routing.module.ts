import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddBillComponent, BillDetailComponent } from "./pages";

const routes: Routes = [
	{
		path: "",
		redirectTo: "add-bill",
		pathMatch: "full"
	},
	{
		path: "add-bill",
		component: AddBillComponent
	},
	{
		path: "bill-detail/:id",
		component: BillDetailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BillRoutingModule {}
