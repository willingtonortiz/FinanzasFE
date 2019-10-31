import { Component, OnInit, Input } from "@angular/core";
import { Bill, CurrencyType } from "src/app/shared/models";

import { DiscountService } from "src/app/core/http";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";
import { DiscountBillService } from "src/app/core/services";

@Component({
	selector: "app-select-bill",
	templateUrl: "./select-bill.component.html",
	styleUrls: ["./select-bill.component.scss"]
})
export class SelectBillComponent implements OnInit {
	@Input() public bill: Bill;
	public currency: string;

	constructor(
		private discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService
	) {
		this.bill = {
			currency: CurrencyType.Soles,
			startDate: new Date(),
			endDate: new Date(),
			amount: 10000
		};
	}

	public ngOnInit() {
		if (this.bill.currency === CurrencyType.Soles) {
			this.currency = "PEN";
		} else {
			this.currency = "USD";
		}
	}

	public selectBill() {
		// this.discountService.CurrentBill = this.bill;
		// console.log(this.discountService.CurrentBill);
		this._discountBillService.setBill(this.bill);
		this.discountBillModalService.setPage(2);
	}
}
