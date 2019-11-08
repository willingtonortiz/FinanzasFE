import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavPageRoutingModule } from "./nav-page-routing.module";
import { NavBarPageComponent } from "./nav-bar-page/nav-bar-page.component";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
	imports: [CommonModule, NavPageRoutingModule, ComponentsModule],
	declarations: [NavBarPageComponent]
})
export class NavPageModule {}
