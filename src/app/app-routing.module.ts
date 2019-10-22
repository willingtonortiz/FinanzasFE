import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Guards
import { AuthGuard } from "./_guards";

// Components
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { HomeComponent } from "./home/home/home.component";
import { BillDetailComponent } from "./bill/bill-detail/bill-detail.component";
import { AddBillComponent } from "./bill/add-bill/add-bill.component";
import { SelectRateComponent } from "./select-rate";
import {
	SelectBillGroupComponent,
	SelectCostComponent,
	SelectBillContainerComponent,
	DiscountContainerComponent,
	DiscountedBillComponent
} from "./discount";
import { DiscountOverviewContainerComponent } from "./discountOverview";

const routes: Routes = [
	{ path: "", redirectTo: "/discount", pathMatch: "full" },
	{ path: "discount", component: DiscountContainerComponent },
	{ path: "rate", component: SelectRateComponent },
	{ path: "home", component: HomeComponent, canActivate: [AuthGuard] },
	{
		path: "billDetail/:id",
		component: BillDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "addBill",
		component: AddBillComponent,
		canActivate: [AuthGuard]
	},
	{ path: "selectRate", component: SelectRateComponent },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "**", redirectTo: "/login" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
