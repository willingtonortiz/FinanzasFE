import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "src/app/shared/models";

import { DiscountService } from "src/app/core/http";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";
import { DiscountBillService } from "src/app/core/services";
import { CurrencyCode, BillStatus } from "src/app/shared/enums";

@Component({
	selector: "app-select-bill",
	templateUrl: "./select-bill.component.html",
	styleUrls: ["./select-bill.component.scss"]
})
export class SelectBillComponent implements OnInit {
	@Input() public bill: Bill;

	constructor(
		private discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService
	) {
		// this.bill = {
		// 	currencyCode: CurrencyCode.PEN,
		// 	startDate: new Date(2019, 9, 1),
		// 	endDate: new Date(2019, 9, 31),
		// 	amount: 10000
		// };
	}

	public ngOnInit() {
		// console.log(this.bill);
		// this.bill = {};
	}

	public selectBill() {
		// this.discountService.CurrentBill = this.bill;
		// console.log(this.discountService.CurrentBill);
		this.bill.status = BillStatus.DISCOUNTING;
		this._discountBillService.setBill(this.bill);
		this.discountBillModalService.setPage(2);
	}
}
