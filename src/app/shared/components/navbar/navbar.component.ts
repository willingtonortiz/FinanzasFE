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
		private authenticationService: AuthenticationService,
		private pymeHttpService: PymeHttpService
	) {
		this.pyme = { businessName: "" };
	}

	async ngOnInit() {
		await this.loadPyme();
	}

	public async loadPyme(): Promise<void> {
		try {
			const id: number = this.authenticationService.currentUserValue.id;
			this.pyme = await this.pymeHttpService.findById(id);
		} catch (error) {
			console.log("ERROR EN NAVBAR COMPONENT");
		}
	}
}
