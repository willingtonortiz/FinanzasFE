import { Component, OnInit } from "@angular/core";
import { Bill } from "src/app/shared/models";

import { AuthenticationService } from "src/app/core/authentication";
import { BillService } from "src/app/core/http";
import { BillType } from "src/app/shared/enums";

@Component({
	selector: "app-bill-group",
	templateUrl: "./bill-group.component.html",
	styleUrls: ["./bill-group.component.scss"]
})
export class BillGroupComponent implements OnInit {
	public bills: Bill[];
	public selectedBills: Bill[];
	public billType: number;

	constructor(
		private authenticationService: AuthenticationService,
		private billService: BillService
	) {}

	public async ngOnInit() {
		this.billType = 1;

		try {
			this.bills = await this.billService.findByUserId(
				this.authenticationService.currentUserValue.id
			);
			this.updateBills();
		} catch (error) {
			console.log(error);
		}
	}

	changeType(type: number) {
		if (type !== this.billType) {
			this.billType = type;
			this.updateBills();
		}
	}

	updateBills() {
		this.selectedBills = this.bills.filter(x => x.type === this.billType);
	}
}
