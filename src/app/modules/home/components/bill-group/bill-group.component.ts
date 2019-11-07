import { Component, OnInit } from "@angular/core";
import { Bill } from "src/app/shared/models";

import { AuthenticationService } from "src/app/core/authentication";
import { BillService } from "src/app/core/http";
import { BillType } from "src/app/shared/enums";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";

@Component({
	selector: "app-bill-group",
	templateUrl: "./bill-group.component.html",
	styleUrls: ["./bill-group.component.scss"]
})
export class BillGroupComponent implements OnInit {
	public bills: Bill[];
	// public selectedBills: Bill[];
	public billType: number;

	constructor(private billListService: BillListService) {
		this.bills = [];
	}

	public async ngOnInit() {
		this.billType = 1;

		this.bills = await this.billListService.getBillsToPay();
		// try {
		// 	this.bills = await this.billListService.findByUserId(
		// 		this.authenticationService.currentUserValue.id
		// 	);
		// 	this.updateBills();
		// } catch (error) {
		// 	console.log(error);
		// }
	}

	changeActive(type: number) {
		// var actives = document.getElementsByClassName("active")[0];
		// actives.classList.remove("active");
		// var newActives = document.getElementsByClassName("nav-link");
		// newActives[type + 1].classList.add("active");
	}

	changeType(type: number) {
		// this.changeActive(type);
		// if (type !== this.billType) {
		// 	this.billType = type;
		// 	this.updateBills();
		// }
	}

	updateBills() {
		// this.selectedBills = this.bills.filter(x => x.type === this.billType);
	}
}
