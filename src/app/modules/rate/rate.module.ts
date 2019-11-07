import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RateRoutingModule } from "./rate-routing.module";
import { SelectRateComponent } from "./pages";
import {
	BankGroupComponent,
	CreateRateComponent,
	DisplayBankComponent
} from "./components";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RateRoutingModule,
		ComponentsModule
	],
	declarations: [
		SelectRateComponent,
		BankGroupComponent,
		CreateRateComponent,
		DisplayBankComponent
	]
})
export class RateModule {}
