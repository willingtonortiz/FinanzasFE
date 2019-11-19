import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavBarPageComponent } from "./pages";

const routes: Routes = [
	{
		path: "",
		component: NavBarPageComponent,
		children: [
			{
				path: "",
				redirectTo: "home",
				pathMatch: "full"
			},
			{
				path: "home",
				loadChildren: "../home/home.module#HomeModule"
			},
			{
				path: "bill",
				loadChildren: "../bill/bill.module#BillModule"
			},
			{
				path: "rate",
				loadChildren: "../rate/rate.module#RateModule"
			},
			{
				path: "discount",
				loadChildren: "../discount/discount.module#DiscountModule"
			},
			{
				path: "discount-overview",
				loadChildren:
					"../discount-overview/discount-overview.module#DiscountOverviewModule"
			},
			{
				path: "record",
				loadChildren:
					"../record/record.module#RecordModule"
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NavPageRoutingModule {}
