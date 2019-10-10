import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
	selector: "app-add-bill-container",
	templateUrl: "./add-bill-container.component.html",
	styleUrls: ["./add-bill-container.component.scss"]
})
export class AddBillContainerComponent implements OnInit {
	constructor(private location: Location) {}

	ngOnInit() {}

	goBack() {
		this.location.back();
	}
}
