import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
	AuthenticationService,
	TokenInterceptor,
	UserService,
	ErrorInterceptor
} from "./_services";

import { AuthGuard } from "./_guards";
import { LoginComponent, RegisterComponent } from "./account";
import { HomeComponent } from "./home/home/home.component";
import { BillComponent, BillGroupComponent } from "./shared";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AddBillComponent } from "./add-bill/add-bill/add-bill.component";
import { AddBillContainerComponent } from "./add-bill/add-bill-container/add-bill-container.component";
import { BillTypePipe } from "./_pipes/bill-type.pipe";
import { DisplayBillContainerComponent } from "./display-bill/display-bill-container/display-bill-container.component";
import { DisplayBillComponent } from "./display-bill/display-bill/display-bill.component";
import { BillDetailComponent } from "./bill/bill-detail/bill-detail.component";

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
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
		AddBillContainerComponent,
		BillTypePipe,
		DisplayBillContainerComponent,
		DisplayBillComponent,
		BillDetailComponent
	],
	providers: [
		AuthenticationService,
		UserService,
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
