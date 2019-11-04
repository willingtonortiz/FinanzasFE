import { Component, OnInit, Input } from "@angular/core";

import { Bank, Rate } from "src/app/shared/models";
import { DiscountPoolRateService } from "src/app/core/services";
import { CurrencyCode, RateTerm, RateType } from "src/app/shared/enums";

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
			currencyCode: CurrencyCode.PEN,
			rateTerm: RateTerm.ANNUAL,
			rateType: RateType.EFFECTIVE,
			rateValue: this.bank.teaSoles
		};

		this.discountPoolRateService.setRate(rate);
	}

	public selectDolares() {
		const rate: Rate = {
			currencyCode: CurrencyCode.USD,
			rateTerm: RateTerm.ANNUAL,
			rateType: RateType.EFFECTIVE,
			rateValue: this.bank.teaDolares
		};
		this.discountPoolRateService.setRate(rate);
	}
}
