import { Component, OnInit } from "@angular/core";

import { Bill, User } from "src/app/shared/models";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { BillService } from "src/app/core/http";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";

@Component({
	selector: "app-select-bill-group",
	templateUrl: "./select-bill-group.component.html",
	styleUrls: ["./select-bill-group.component.scss"]
})
export class SelectBillGroupComponent implements OnInit {
	public bills: Bill[];
	public user: User;

	constructor(
		private authenticationService: AuthenticationService,
		private billService: BillService,
		private discountBillModalService: DiscountBillModalService
	) {
		this.user = this.authenticationService.currentUserValue;
	}

	async ngOnInit() {
		this.bills = [];

		try {
			this.bills = await this.billService.findByUserId(this.user.id);
		} catch (error) {
			console.log(error);
		}
	}

	public closeModal(): void {
		this.discountBillModalService.hide();
	}
}
