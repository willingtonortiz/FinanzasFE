import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent
} from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const currentUser = this.authenticationService.currentUserValue;
		const isLoggedIn = currentUser && currentUser.token;

		if (isLoggedIn) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.token}`
				}
			});
		}

		return next.handle(request);
	}
}
