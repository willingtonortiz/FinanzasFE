import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Discount } from "src/app/shared/models";
import { DiscountsListService, DiscountPoolDataService, DiscountProcessService } from "src/app/core/services";

@Component({
	selector: "app-discounted-bill",
	templateUrl: "./discounted-bill.component.html",
	styleUrls: ["./discounted-bill.component.scss"]
})
export class DiscountedBillComponent implements OnInit {
	@Input() discount: Discount;

	constructor(private _discountsListService: DiscountsListService,
		private _discountProcessService: DiscountProcessService
		) {}

	ngOnInit() {}

	public deleteDiscount(): void {
		this._discountsListService.deleteDiscount(this.discount.id);
		this._discountProcessService.updateDiscountPool();
	}
}
