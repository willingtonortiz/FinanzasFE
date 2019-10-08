import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
	AuthenticationService,
	TokenInterceptor,
	UserService,
	ErrorInterceptor
} from "./services";

import { AuthGuard } from "./guards";

import { LoginComponent, RegisterComponent } from "./account";

import { UserComponent } from "./test/user/user.component";
import { AdminComponent } from "./test/admin/admin.component";
import { HomeComponent } from "./home/home/home.component";

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
		UserComponent,
		AdminComponent,
		HomeComponent
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
