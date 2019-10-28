import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthenticationService } from "../../authentication";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit() {}

	public logout() {
		this.authenticationService.logout();
		this.router.navigate(["/login"]);
	}
}
