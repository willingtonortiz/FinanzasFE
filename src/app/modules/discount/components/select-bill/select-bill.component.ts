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
		private _discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService
	) {}

	public ngOnInit() {}

	public selectBill() {
		this.bill.status = BillStatus.DISCOUNTING;
		this._discountBillService.setBill(this.bill);
		this._discountBillModalService.setPage(2);
	}
}
