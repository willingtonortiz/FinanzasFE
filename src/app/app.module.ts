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

import { UserComponent } from "./test/user/user.component";
import { AdminComponent } from "./test/admin/admin.component";
import { HomeComponent } from "./home/home/home.component";
import { BillComponent, BillGroupComponent } from "./shared";
import { NavbarComponent } from "./shared/navbar/navbar.component";

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
		UserComponent,
		AdminComponent,
		HomeComponent,
		BillComponent,
		BillGroupComponent,
		NavbarComponent
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
