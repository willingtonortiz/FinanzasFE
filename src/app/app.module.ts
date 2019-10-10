import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Routing
import { AppRoutingModule } from "./app-routing.module";

// Services and interceptors
import {
	AuthenticationService,
	TokenInterceptor,
	UserService,
	ErrorInterceptor
} from "./_services";

// Guards
import { AuthGuard } from "./_guards";

// Pipes
import { BillTypePipe } from "./_pipes/bill-type.pipe";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent, RegisterComponent } from "./account";
import { HomeComponent } from "./home/home/home.component";
import { BillComponent, BillGroupComponent, NavbarComponent } from "./shared";
import { BillDetailComponent, AddBillComponent } from "./bill";

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
		BillDetailComponent,
		BillTypePipe
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
