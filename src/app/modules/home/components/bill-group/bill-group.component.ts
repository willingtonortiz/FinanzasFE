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
	public option: number;

	constructor(private billListService: BillListService) {
		this.bills = [];
	}

	public async ngOnInit() {
		this.option = 1;

		this.bills = await this.billListService.getBillsToPay();
	}

	public async changeOption(option: number) {
		// console.log(option);
		if (option === this.option) return;
		this.option = option;

		console.log(option);
		if (option === 1) {
			this.bills = await this.billListService.getBillsToPay();
		} else if (option === 2) {
			this.bills = await this.billListService.getBillsToCharge();
		} else {
			this.bills = await this.billListService.getDiscountedBills();
		}
	}

	changeActive(type: number) {
		// var actives = document.getElementsByClassName("active")[0];
		// actives.classList.remove("active");
		// var newActives = document.getElementsByClassName("nav-link");
		// newActives[type + 1].classList.add("active");
	}

	updateBills() {
		// this.selectedBills = this.bills.filter(x => x.type === this.billType);
	}
}
