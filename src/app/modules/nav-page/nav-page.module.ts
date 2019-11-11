import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavPageRoutingModule } from "./nav-page-routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module";

import { NavBarPageComponent } from "./pages";
import { ModalContainerComponent } from "./components";
import { ModalContainerService } from "./services";
import { CreatedBillModalComponent } from "./components/created-bill-modal/created-bill-modal.component";
import { DeleteBillModalComponent } from "./components/delete-bill-modal/delete-bill-modal.component";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";

@NgModule({
	imports: [CommonModule, NavPageRoutingModule, ComponentsModule],
	declarations: [
		NavBarPageComponent,
		ModalContainerComponent,
		CreatedBillModalComponent,
		DeleteBillModalComponent
	],
	providers: [ModalContainerService, BillListService]
})
export class NavPageModule {}
