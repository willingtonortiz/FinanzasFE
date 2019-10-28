import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Routing
import { AppRoutingModule } from "./app-routing.module";

// Services and interceptors
import {
	AuthenticationService,
	TokenInterceptor,
	UserService,
	ErrorInterceptor,
	BillService,
	BankService,
	SelectBillService,
	DiscountPoolService,
	DiscountProcessService,
	DiscountService,
	UtilService
} from "./_services";

// Guards
import { AuthGuard } from "./_guards";

// Pipes
import {
	CurrencyTypePipe,
	RateTermPipe,
	RateTypePipe,
	BillTypePipe
} from "./_pipes";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent, RegisterComponent } from "./account";
import { HomeComponent } from "./home/home/home.component";
import { BillComponent, BillGroupComponent, NavbarComponent } from "./shared";
import { BillDetailComponent, AddBillComponent } from "./bill";

import {
	BankGroupComponent,
	DisplayBankComponent,
	CreateRateComponent,
	SelectRateComponent
} from "./select-rate";

import {
	DiscountContainerComponent,
	SelectBillComponent,
	SelectBillContainerComponent,
	SelectBillGroupComponent,
	SelectCostComponent,
	DiscountedBillComponent,
	DiscountedBillGroupComponent
} from "./discount";

import { DiscountPoolOverviewComponent } from "./discount/discount-pool-overview/discount-pool-overview.component";
import { DiscountOverviewContainerComponent } from "./discountOverview";

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		BillComponent,
		BillGroupComponent,
		NavbarComponent,
		AddBillComponent,
		BillDetailComponent,
		BankGroupComponent,
		DisplayBankComponent,
		CreateRateComponent,
		SelectRateComponent,
		DiscountContainerComponent,
		SelectBillComponent,
		SelectBillContainerComponent,
		SelectBillGroupComponent,
		SelectCostComponent,
		DiscountedBillComponent,
		DiscountOverviewContainerComponent,
		CurrencyTypePipe,
		BillTypePipe,
		RateTermPipe,
		RateTypePipe,
		DiscountedBillGroupComponent,
		DiscountPoolOverviewComponent
	],
	providers: [
		AuthenticationService,
		BankService,
		BillService,
		UserService,
		SelectBillService,
		DiscountPoolService,
		DiscountProcessService,
		DiscountService,
		UtilService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
