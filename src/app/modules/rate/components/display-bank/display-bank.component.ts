import { Component, OnInit, Input } from "@angular/core";

import {
	Bank,
	CurrencyType,
	RateTerm,
	RateType,
	Rate
} from "src/app/shared/models";
import { DiscountService } from "src/app/core/services";

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
		const rate: Rate = {
			currency: CurrencyType.Soles,
			rateTerm: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: this.bank.teaSoles
		};

		this.discountService.Rate = rate;
	}

	public selectDolares() {
		const rate: Rate = {
			currency: CurrencyType.Dolares,
			rateTerm: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: this.bank.teaDolares
		};
		this.discountService.Rate = rate;
	}
}
