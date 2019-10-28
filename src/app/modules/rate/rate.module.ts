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

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, RateRoutingModule],
	declarations: [
		SelectRateComponent,
		BankGroupComponent,
		CreateRateComponent,
		DisplayBankComponent
	]
})
export class RateModule {}
