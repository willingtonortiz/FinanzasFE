import { Component, OnInit } from "@angular/core";

import { Bill } from "src/app/shared/models";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";
import { DiscountDateService } from 'src/app/core/services';

@Component({
	selector: "app-select-bill-group",
	templateUrl: "./select-bill-group.component.html",
	styleUrls: ["./select-bill-group.component.scss"]
})
export class SelectBillGroupComponent implements OnInit {
	public bills: Bill[];
	public date: Date;

	constructor(
		private _billListService: BillListService,
		private _discountBillModalService: DiscountBillModalService,
		private _discountDateService: DiscountDateService
	) {}

	public async ngOnInit() {
		//this.date=this._discountDateService.discountDateValue().subscribe();
		this.date=this._discountDateService.discountDateValue;
		this._billListService.getValidBillsToCharge(this.date).subscribe(x => {
			this.bills = x;
			//console.log(this.bills);
		});
	}

	public closeModal(): void {
		this._discountBillModalService.hide();
	}
}
