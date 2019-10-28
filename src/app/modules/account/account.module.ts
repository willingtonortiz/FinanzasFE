import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { LoginComponent, RegisterComponent } from "./pages";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, AccountRoutingModule],
	declarations: [LoginComponent, RegisterComponent]
})
export class AccountModule {}
