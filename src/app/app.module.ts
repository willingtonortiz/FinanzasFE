import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./account/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./services/auth/auth.service";
import { RegisterComponent } from "./account/register/register.component";
import { UserComponent } from "./test/user/user.component";
import { AdminComponent } from "./test/admin/admin.component";
import { HomeComponent } from "./home/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor/token-interceptor.service";
import { UserService } from "./services/user/user.service";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		UserComponent,
		AdminComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [
		AuthService,
		UserService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
