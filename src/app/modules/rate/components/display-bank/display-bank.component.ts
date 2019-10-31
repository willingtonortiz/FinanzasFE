import { Component, OnInit, Input } from "@angular/core";

import {
	Bank,
	CurrencyType,
	RateTerm,
	RateType,
	Rate
} from "src/app/shared/models";
import { DiscountPoolRateService } from "src/app/core/services";

@Component({
	selector: "app-display-bank",
	templateUrl: "./display-bank.component.html",
	styleUrls: ["./display-bank.component.scss"]
})
export class DisplayBankComponent implements OnInit {
	@Input() public bank: Bank;

	constructor(private discountPoolRateService: DiscountPoolRateService) {}

	ngOnInit() {}

	public selectSoles() {
		const rate: Rate = {
			currency: CurrencyType.Soles,
			rateTerm: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: this.bank.teaSoles
		};

		this.discountPoolRateService.setRate(rate);
	}

	public selectDolares() {
		const rate: Rate = {
			currency: CurrencyType.Dolares,
			rateTerm: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: this.bank.teaDolares
		};
		this.discountPoolRateService.setRate(rate);
	}
}
