import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards";

const routes: Routes = [
	{
		path: "account",
		loadChildren: "./modules/account/account.module#AccountModule"
	},
	{
		path: "",
		loadChildren: "./modules/nav-page/nav-page.module#NavPageModule",
		canActivate: [AuthGuard]
	},
	{
		path: "**",
		redirectTo: "account",
		pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
