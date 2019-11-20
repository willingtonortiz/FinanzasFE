import { Component, OnInit, Input } from "@angular/core";
import { DiscountInput } from "src/app/shared/dtos/input/DiscountInput";
import { DiscountedDiscountPoolService } from "../../services";
import { CurrencyCode } from "src/app/shared/enums";

@Component({
	selector: "app-discounted-bill-info",
	templateUrl: "./discounted-bill-info.component.html",
	styleUrls: ["./discounted-bill-info.component.scss"]
})
export class DiscountedBillInfoComponent implements OnInit {
	@Input() discountedBill: DiscountInput;
	public currencyCode: CurrencyCode;

	constructor(
		private _discountedDiscountPoolService: DiscountedDiscountPoolService
	) { }

	ngOnInit() {
		this.currencyCode = this._discountedDiscountPoolService.discountPoolValue.currencyCode;
		this.discountedBill.discount = this.discountedBill.discountRate * this.discountedBill.deliveredValue;
		console.log(this.discountedBill);
	}
}
