import { Component, OnInit, Input } from "@angular/core";
import {
	Bank,
	Discount,
	CurrencyType,
	RateTerm,
	RateType
} from "src/app/_models";
import { DiscountService } from "src/app/_services";

@Component({
	selector: "app-display-bank",
	templateUrl: "./display-bank.component.html",
	styleUrls: ["./display-bank.component.scss"]
})
export class DisplayBankComponent implements OnInit {
	@Input() public bank: Bank;

	constructor(private discountService: DiscountService) {
		// this.bank = null;
	}

	ngOnInit() {}

	public selectSoles() {
		const discount: Discount = {
			currency: CurrencyType.Soles,
			rateTem: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: this.bank.teaSoles
		};

		this.discountService.Discount = discount;
	}

	public selectDolares() {
		const discount: Discount = {
			currency: CurrencyType.Dolares,
			rateTem: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: this.bank.teaDolares
		};
		this.discountService.Discount = discount;
	}
}
