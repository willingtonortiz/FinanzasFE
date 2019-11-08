import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BillRoutingModule } from "./bill-routing.module";
import { AddBillComponent, BillDetailComponent } from "./pages";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { BillProgressBarComponent } from './components/bill-progress-bar/bill-progress-bar.component';

@NgModule({
	imports: [
		CommonModule,
		BillRoutingModule,
		ReactiveFormsModule,
		ComponentsModule,
		PipesModule
	],
	declarations: [AddBillComponent, BillDetailComponent, BillProgressBarComponent]
})
export class BillModule {}
