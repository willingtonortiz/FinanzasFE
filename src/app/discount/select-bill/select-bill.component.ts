import { Component, OnInit, Input } from "@angular/core";
import { Bill, CurrencyType } from "src/app/_models";
import { DiscountService } from "src/app/_services";

@Component({
	selector: "app-select-bill",
	templateUrl: "./select-bill.component.html",
	styleUrls: ["./select-bill.component.scss"]
})
export class SelectBillComponent implements OnInit {
	@Input() public bill: Bill;
	public currency: string;

	constructor(private discountService: DiscountService) {
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
		this.discountService.CurrentBill = this.bill;
		console.log(this.discountService.CurrentBill);
	}
}
