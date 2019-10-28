import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../../authentication";

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
