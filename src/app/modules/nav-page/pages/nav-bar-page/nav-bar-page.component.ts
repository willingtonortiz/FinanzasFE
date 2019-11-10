import { Component, OnInit } from "@angular/core";
import { ModalContainerService } from "../../services";

@Component({
	selector: "app-nav-bar-page",
	templateUrl: "./nav-bar-page.component.html",
	styleUrls: ["./nav-bar-page.component.scss"]
})
export class NavBarPageComponent implements OnInit {
	public isActive: boolean;

	constructor(private _modalContainerService: ModalContainerService) {}

	ngOnInit() {
		this._modalContainerService.isActiveObservable.subscribe({
			next: (data: boolean) => {
				this.isActive = data;
			}
		});
	}
}
