import { Component, OnInit } from "@angular/core";

import { Bill, User } from "src/app/shared/models";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { BillService } from "src/app/core/http";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";
import { UserCredentials } from "src/app/shared/dtos";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";

@Component({
	selector: "app-select-bill-group",
	templateUrl: "./select-bill-group.component.html",
	styleUrls: ["./select-bill-group.component.scss"]
})
export class SelectBillGroupComponent implements OnInit {
	public bills: Bill[];
	public user: UserCredentials;

	constructor(
		private authenticationService: AuthenticationService,
		private billListService: BillListService,
		private discountBillModalService: DiscountBillModalService
	) {
		this.user = this.authenticationService.currentUserValue;
	}

	public async ngOnInit() {
		this.billListService.getBillsToCharge().subscribe(x => (this.bills = x));
	}

	public closeModal(): void {
		this.discountBillModalService.hide();
	}
}
