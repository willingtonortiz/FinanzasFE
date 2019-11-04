import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BillRoutingModule } from "./bill-routing.module";
import { AddBillComponent, BillDetailComponent } from "./pages";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, BillRoutingModule, ReactiveFormsModule],
	declarations: [AddBillComponent, BillDetailComponent]
})
export class BillModule {}
