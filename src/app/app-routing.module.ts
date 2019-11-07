import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full"
	},
	{
		path: "account",
		loadChildren: "./modules/account/account.module#AccountModule"
	},
	{
		path: "bill",
		loadChildren: "./modules/bill/bill.module#BillModule"
	},
	{
		path: "home",
		loadChildren: "./modules/home/home.module#HomeModule"
		// canActivate: [AuthGuard]
	},
	{
		path: "rate",
		loadChildren: "./modules/rate/rate.module#RateModule"
	},
	{
		path: "discount",
		loadChildren: "./modules/discount/discount.module#DiscountModule"
	}

	// { path: "", redirectTo: "/discount", pathMatch: "full" },
	// { path: "discount", component: DiscountContainerComponent },
	// {
	// 	path: "billDetail/:id",
	// 	component: BillDetailComponent,
	// 	canActivate: [AuthGuard]
	// },
	// {
	// 	path: "addBill",
	// 	component: AddBillComponent,
	// 	canActivate: [AuthGuard]
	// },
	// { path: "selectRate", component: SelectRateComponent },
	// { path: "**", redirectTo: "/login" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
