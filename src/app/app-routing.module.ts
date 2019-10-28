import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards";

const routes: Routes = [
	{
		path: "",
		redirectTo: "rate",
		pathMatch: "full"
	},
	{
		path: "account",
		loadChildren: "./modules/account/account.module#AccountModule"
	},
	{
		path: "home",
		loadChildren: "./modules/home/home.module#HomeModule"
		// canActivate: [AuthGuard]
	},
	{
		path: "rate",
		loadChildren: "./modules/rate/rate.module#RateModule"
	}

	// { path: "", redirectTo: "/discount", pathMatch: "full" },
	// { path: "discount", component: DiscountContainerComponent },
	// { path: "rate", component: SelectRateComponent },
	// { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
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
	// { path: "login", component: LoginComponent },
	// { path: "register", component: RegisterComponent },
	// { path: "**", redirectTo: "/login" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
