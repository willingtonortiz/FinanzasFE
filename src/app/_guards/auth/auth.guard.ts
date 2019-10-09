import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from "@angular/router";
import { AuthenticationService } from "src/app/_services";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		const currentUser = this.authenticationService.currentUserValue;

		if (currentUser) {
			// Si hay rol y no está autorizado
			if (
				route.data.roles &&
				route.data.roles.indexOf(currentUser.role) === -1
			) {
				this.router.navigate["/login"];
				return false;
			}

			return true;
		}

		// Si no hay usuario
		console.log(state.url);
		this.router.navigate(["/login"]);
		return false;
	}
}
