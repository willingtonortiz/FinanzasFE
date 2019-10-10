import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./account/login/login.component";

import { RegisterComponent } from "./account/register/register.component";
import { HomeComponent } from "./home/home/home.component";
import { Role } from "./_models";
import { AuthGuard } from "./_guards";
import { AddBillContainerComponent } from "./add-bill";
import { DisplayBillComponent } from "./display-bill/display-bill/display-bill.component";
import { BillDetailComponent } from "./bill/bill-detail/bill-detail.component";

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", component: HomeComponent, canActivate: [AuthGuard] },
	{
		path: "billDetail/:id",
		component: BillDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "addBill",
		component: AddBillContainerComponent,
		canActivate: [AuthGuard]
	},
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "**", redirectTo: "/login" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
