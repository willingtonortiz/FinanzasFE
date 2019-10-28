import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BillRoutingModule } from "./bill-routing.module";
import { AddBillComponent, BillDetailComponent } from "./pages";

@NgModule({
	declarations: [AddBillComponent, BillDetailComponent],
	imports: [CommonModule, BillRoutingModule]
})
export class BillModule {}
