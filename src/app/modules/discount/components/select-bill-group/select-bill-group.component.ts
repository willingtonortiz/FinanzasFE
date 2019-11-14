import { Component, OnInit } from "@angular/core";

import { Bill } from "src/app/shared/models";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";

@Component({
	selector: "app-select-bill-group",
	templateUrl: "./select-bill-group.component.html",
	styleUrls: ["./select-bill-group.component.scss"]
})
export class SelectBillGroupComponent implements OnInit {
	public bills: Bill[];

	constructor(
		private _billListService: BillListService,
		private _discountBillModalService: DiscountBillModalService
	) {}

	public async ngOnInit() {
		this._billListService.getValidBillsToCharge().subscribe(x => {
			this.bills = x;
			console.log(this.bills);
		});
	}

	public closeModal(): void {
		this._discountBillModalService.hide();
	}
}
