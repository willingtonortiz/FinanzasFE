import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./test/admin/admin.component";
import { UserComponent } from "./test/user/user.component";
// import { HomeComponent } from "./home/home/home.component";
import { LoginComponent } from "./account/login/login.component";

import { RegisterComponent } from "./account/register/register.component";
import { HomeComponent } from "./home/home/home.component";
import { Role } from "./_models";
import { AuthGuard } from "./_guards";

const routes: Routes = [
	{ path: "", component: HomeComponent, canActivate: [AuthGuard] },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{
		path: "adminView",
		component: AdminComponent,
		canActivate: [AuthGuard],
		data: {
			roles: [Role.Admin]
		}
	},
	{ path: "userView", component: UserComponent, canActivate: [AuthGuard] },
	{ path: "**", redirectTo: "/login" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
