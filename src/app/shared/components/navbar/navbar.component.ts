import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/authentication";
import { PymeHttpService } from "src/app/core/http";
import { Pyme } from "../../models";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
	public pyme: Pyme;

	constructor(
		private _authenticationService: AuthenticationService,
		private _pymeHttpService: PymeHttpService
	) {
		this.pyme = { businessName: "" };
	}

	async ngOnInit() {
		await this.loadPyme();
	}

	public async loadPyme(): Promise<void> {
		try {
			const id: number = this._authenticationService.currentUserValue.id;
			this.pyme = await this._pymeHttpService.findById(id);
		} catch (error) {
			console.log("ERROR EN NAVBAR COMPONENT");
		}
	}

	public logout() {
		this._authenticationService.logout();
	}
}
