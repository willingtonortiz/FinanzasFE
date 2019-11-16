import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Rate, DiscountPool } from "src/app/shared/models";
import { DiscountService } from "src/app/core/http";
import {
	DiscountBillModalService,
	DiscountProcessService
} from "src/app/core/services";
import { BillListService } from "src/app/core/services/bill/bill-list/bill-list.service";

@Component({
	selector: "app-discount-container",
	templateUrl: "./discount-container.component.html",
	styleUrls: ["./discount-container.component.scss"]
})
export class DiscountContainerComponent implements OnInit, OnDestroy {
	public discountPool: DiscountPool;

	// Para el modal
	public _suscription: Subscription;
	public modalStatus: boolean;

	constructor(
		private _billListService: BillListService,
		private _discountBillModalService: DiscountBillModalService,
		private _discountProcessService: DiscountProcessService
	) {
		this._suscription = this._discountBillModalService.Display.subscribe({
			next: (value: boolean) => {
				this.modalStatus = value;
			}
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		this._suscription.unsubscribe();
	}

	public goBack() {
		this._billListService.normalizeBills();
		this._discountProcessService.cancelDiscount();
	}
}
