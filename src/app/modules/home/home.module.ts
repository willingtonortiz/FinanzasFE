import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages";
import { BillComponent, BillGroupComponent } from "./components";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { PipesModule } from "src/app/shared/pipes/pipes.module";

@NgModule({
	imports: [CommonModule, HomeRoutingModule, ComponentsModule, PipesModule],
	declarations: [HomeComponent, BillComponent, BillGroupComponent]
})
export class HomeModule {}
