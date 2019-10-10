import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/_services";
import { Router } from "@angular/router";

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
