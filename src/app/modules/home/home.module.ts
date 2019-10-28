import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages";
import { BillComponent, BillGroupComponent } from "./components";

@NgModule({
	declarations: [HomeComponent, BillComponent, BillGroupComponent],
	imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
