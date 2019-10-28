import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../../authentication";

@Injectable({
	providedIn: "root"
})
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService) {}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError(err => {
				if ([401, 403].indexOf(err.status) !== -1) {
					this.authenticationService.logout();
					location.reload(true);
				}

				const error = err.error.message || err.statusText;
				return throwError(error);
			})
		);
	}
}
